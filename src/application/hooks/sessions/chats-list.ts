import { computed, Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { ChatEntity, GetUserLastChat, ListenToUserLastChat } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { isServer } from '@utils/environment'
import { getChatsPath } from '@utils/constants'

const global = {} as Record<string, {
	chat: Ref<ChatEntity | null>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatList = () => {
	const { chats: userChats } = useAuth()
	const chats = computed({
		get: () => userChats.value.sort((a, b) => {
			return a.name.first < b.name.first ? -1 : 1
		}),
		set: () => {}
	})

	return { chats }
}

export const useChatCard = (userId: string) => {
	const { id } = useAuth()
	const path = getChatsPath(id.value, userId)
	if (global[userId] === undefined || isServer()) global[userId] = {
		chat: ssrRef(null),
		fetched: ssrRef(false),
		...useErrorHandler(), ...useLoadingHandler()
	}

	const fetchChat = async () => {
		global[userId].setError('')
		try {
			global[userId].setLoading(true)
			global[userId].chat.value = await GetUserLastChat.call(path)
			global[userId].fetched.value = true
		} catch (e) { global[userId].setError(e) }
		global[userId].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (chat: ChatEntity | null) => global[userId].chat.value = chat
		return ListenToUserLastChat.call(path, callback)
	})

	useFetch(async () => {
		if (isServer() && !global[userId].fetched.value) await fetchChat()
	})

	return {
		chat: global[userId].chat,
		error: global[userId].error,
		loading: global[userId].loading,
		listener
	}
}
