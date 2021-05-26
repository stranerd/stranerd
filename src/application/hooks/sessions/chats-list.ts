import { ssrRef } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { ChatMetaEntity, ListenToPersonalChatsMeta } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	meta: ssrRef([] as ChatMetaEntity[]),
	listener: null as null | ReturnType<typeof useListener>,
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
	return { ...global }
}
