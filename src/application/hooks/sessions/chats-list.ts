import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { ChatMetaEntity, GetPersonalChatsMeta, ListenToPersonalChatsMeta } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { AudioSounds, useAudioPlayer } from '@app/hooks/core/audios'

const player = useAudioPlayer(AudioSounds.CHAT)

const global = {} as Record<string, {
	meta: Ref<ChatMetaEntity[]>,
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatsList = () => {
	const { id } = useAuth()
	const userId = id.value ?? 'empty'
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!id.value) return () => {}
			const cb = async (entities: ChatMetaEntity[]) => {
				const hasNewMessage = entities.some((entity) => {
					const globalUnReads = global[userId].meta.value.find((m) => m.id === entity.id)
					if (!globalUnReads) return true
					return entity.unRead.some((unread) => !globalUnReads.unRead.includes(unread))
				})
				global[userId].meta.value = entities
				if (hasNewMessage) await player.play()
			 }

			return ListenToPersonalChatsMeta.call(userId, cb)
		})
		global[userId] = {
			meta: ssrRef([]),
			fetched: ssrRef(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}
	const fetchMeta = async () => {
		if (!id.value) return
		global[userId].setError('')
		try {
			global[userId].setLoading(true)
			global[userId].meta.value = await GetPersonalChatsMeta.call(userId)
			global[userId].fetched.value = true
		} catch (e) { global[userId].setError(e) }
		global[userId].setLoading(false)
	}
	useFetch(async () => {
		if (!id.value) return
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchMeta()
	})
	return { ...global[userId] }
}
