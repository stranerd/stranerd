import { computed, Ref, ssrRef, ref, useFetch, watch } from '@nuxtjs/composition-api'
import { AddPersonalChat, ChatEntity, ChatFactory, GetPersonalChats, ListenToPersonalChats } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'
import { CHAT_PAGINATION_LIMIT, PATH_SEPARATOR } from '@utils/constants'
import { getRandomValue } from '@utils/numbers'

const getChatsPath = (id1: string, id2: string) => [id1, id2].sort().join(PATH_SEPARATOR)

const global = {} as Record<string, {
	chats: Ref<ChatEntity[]>,
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToChats = (userId: string, chat: ChatEntity) => {
	const index = global[userId].chats.value.findIndex((c) => c.id === chat.id)
	if (index !== -1) global[userId].chats.value.splice(index, 1, chat)
	else global[userId].chats.value.push(chat)
}
const unshiftToChats = (userId: string, chat: ChatEntity) => {
	const index = global[userId].chats.value.findIndex((c) => c.id === chat.id)
	if (index !== -1) global[userId].chats.value.splice(index, 1, chat)
	else global[userId].chats.value.unshift(chat)
}

export const useChats = (userId: string) => {
	const { id } = useAuth()
	if (global[userId] === undefined) global[userId] = {
		chats: ssrRef([]),
		fetched: ssrRef(false),
		hasMore: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}
	const path = getChatsPath(id.value, userId)

	const fetchChats = async () => {
		global[userId].setError('')
		try {
			const lastDate = global[userId].chats.value[global[userId].chats.value.length - 1]?.createdAt
			const chats = await GetPersonalChats.call(path, lastDate ? new Date(lastDate) : undefined)
			global[userId].hasMore.value = chats.length === CHAT_PAGINATION_LIMIT + 1
			chats.reverse().slice(0, CHAT_PAGINATION_LIMIT).map((c) => unshiftToChats(userId, c))
			global[userId].setLoading(true)
			global[userId].fetched.value = true
		} catch (e) { global[userId].setError(e) }
		global[userId].setLoading(false)
	}

	const listener = useListener(async () => {
		const lastDate = global[userId].chats.value[global[userId].chats.value.length - 1]?.createdAt
		const callback = (chats: ChatEntity[]) => chats.map((c) => pushToChats(userId, c))
		return ListenToPersonalChats.call(path, callback, lastDate ? new Date(lastDate) : undefined)
	})

	useFetch(async () => {
		if (!global[userId].fetched.value) await fetchChats()
	})

	return {
		chats: computed({
			get: () => orderChats(global[userId].chats.value.sort((a, b) => {
				return a.createdAt - b.createdAt < 0 ? -1 : 1
			})),
			set: (sessions) => sessions.map((session) => session.chats.map((c) => pushToChats(userId, c)))
		}),
		fetched: global[userId].fetched,
		loading: global[userId].loading,
		error: global[userId].error,
		hasMore: global[userId].hasMore,
		listener,
		fetchOlderChats: fetchChats
	}
}

export const useCreateChat = (userId: string, sessionId?: string) => {
	const { id } = useAuth()
	const factory = ref(new ChatFactory()) as Ref<ChatFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	factory.value.from = id.value!
	watch(() => id.value, () => factory.value.from = id.value!)

	const createTextChat = async () => {
		if (sessionId) factory.value.sessionId = sessionId
		const path = getChatsPath(id.value, userId)
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddPersonalChat.call(path, factory.value)
				factory.value.reset()
			} catch (e) { setError(e) }
			factory.value.reset()
			setLoading(false)
		}
	}

	const createMediaChat = async (files: File[]) => {
		if (!loading.value) {
			setLoading(true)
			const path = getChatsPath(id.value, userId)
			const promises = files.map(async (file) => {
				const mediaFactory = new ChatFactory()
				mediaFactory.from = id.value
				mediaFactory.media = file
				try {
					await AddPersonalChat.call(path, mediaFactory)
				} catch (error) { setError(error) }
			})
			await Promise.all(promises)
			setLoading(false)
		}
	}

	return { factory, error, loading, createTextChat, createMediaChat }
}

const orderChats = (chats: ChatEntity[]) => {
	const res = [] as ChatEntity[][]
	chats.forEach((chat, index) => {
		const lastChat = chats[index - 1]
		if (index === 0 || chat.sessionId !== lastChat.sessionId) return res.push([chat])
		else return res[res.length - 1].push(chat)
	})
	return res.map((chats) => {
		const sessionId = chats[0].sessionId ?? null
		return { chats, sessionId, hash: getRandomValue() }
	})
}
