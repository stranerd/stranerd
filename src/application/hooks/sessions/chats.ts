import { Ref, ssrRef } from '@nuxtjs/composition-api'
import { ChatEntity, ListenToPersonalChats } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'
import { PATH_SEPARATOR } from '@utils/constants'

const getChatsPath = (id1: string, id2: string) => [id1, id2].sort().join(PATH_SEPARATOR)

const global = {} as Record<string, {
	chats: Ref<ChatEntity[]>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChats = (userId: string) => {
	const { id } = useAuth()
	if (global[userId] === undefined) global[userId] = {
		chats: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}
	if (!id.value) global[userId].setError('Currently not logged in')

	const listener = useListener(async () => {
		const callback = (chats: ChatEntity[]) => global[userId].chats.value = chats
		return ListenToPersonalChats.call(
			getChatsPath(id.value, userId),
			callback
		)
	})

	return {
		chats: global[userId].chats,
		fetched: global[userId].fetched,
		loading: global[userId].loading,
		error: global[userId].error,
		listener
	}
}
