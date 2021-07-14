import { Ref, reqRef, useFetch } from '@nuxtjs/composition-api'
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
					const globalUnReads = global[id.value].meta.value.find((m) => m.id === entity.id)
					if (!globalUnReads) return true
					return entity.unRead.some((unread) => !globalUnReads.unRead.includes(unread))
				})
				global[id.value].meta.value = entities
				if (hasNewMessage) await player.play()
			 }

			return ListenToPersonalChatsMeta.call(id.value, cb)
		})
		global[userId] = {
			meta: reqRef([]),
			fetched: reqRef(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}
	const fetchMeta = async () => {
		if (!id.value) return
		global[id.value].setError('')
		try {
			global[id.value].setLoading(true)
			global[id.value].meta.value = await GetPersonalChatsMeta.call(id.value)
			global[id.value].fetched.value = true
		} catch (e) { global[id.value].setError(e) }
		global[id.value].setLoading(false)
	}
	useFetch(async () => {
		if (!id.value) return
		if (!global[id.value].fetched.value && !global[id.value].loading.value) await fetchMeta()
	})
	return { ...global[userId] }
}
