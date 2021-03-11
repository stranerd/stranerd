import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { FindUser, ListenToUser, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	user: Ref<UserEntity | null>,
	fetched: Ref<boolean>,
	error: Ref<string>, setError: (error: any) => void,
	loading: Ref<boolean>, setLoading: (loading: boolean) => void
}>

export const useUser = (id: string) => {
	if (global[id] === undefined) global[id] = {
		user: ssrRef(null),
		fetched: ssrRef(false),
		...useLoadingHandler(),
		...useErrorHandler()
	}

	const fetchUser = async () => {
		global[id].setError('')
		try {
			global[id].setLoading(true)
			global[id].user.value = await FindUser.call(id)
			global[id].fetched.value = true
		} catch (error) { global[id].setError(error) }
		global[id].setLoading(false)
	}

	useFetch(async () => {
		if (!global[id].fetched.value) await fetchUser()
	})

	const listener = useListener(async () => {
		const callback = (user: UserEntity | null) => global[id].user.value = user
		return await ListenToUser.call(id, callback)
	})

	return {
		error: global[id].error,
		loading: global[id].loading,
		user: global[id].user,
		listener
	}
}
