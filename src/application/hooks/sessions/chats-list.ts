import { ssrRef, useFetch } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { ChatMetaEntity, GetPersonalChatsMeta, ListenToPersonalChatsMeta } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	meta: ssrRef([] as ChatMetaEntity[]),
	listener: null as null | ReturnType<typeof useListener>,
	fetched: ssrRef(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const useChatsList = () => {
	const { id } = useAuth()
	if (id.value && !global.listener) {
		global.listener = useListener(async () => {
			const cb = (entities: ChatMetaEntity[]) => global.meta.value = entities
			return ListenToPersonalChatsMeta.call(id.value, cb)
		})
	}
	const fetchMeta = async () => {
		if (!id.value) return
		global.setError('')
		try {
			global.setLoading(true)
			global.meta.value = await GetPersonalChatsMeta.call(id.value)
			global.fetched.value = true
		} catch (e) { global.setError(e) }
		global.setLoading(false)
	}
	useFetch(async () => {
		if (!id.value) return
		if (!global.fetched.value && !global.loading.value) await fetchMeta()
	})
	return { ...global }
}
