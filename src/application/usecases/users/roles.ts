import { reactive, reqRef, toRefs } from '@nuxtjs/composition-api'
import {
	GetUsersByEmail, GetMailingListFactory, SubscribeToMailingList,
	MakeAdmin, RemoveAdmin
} from '@modules/users'
import { UserEntity } from '@modules/users/domain/entities/user'
import { useErrorHandler, useSuccessHandler, useLoadingHandler } from '@app/usecases/core/states'

export const useMailingList = () => {
	const factory = reqRef(GetMailingListFactory.call())
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const subscribeToMailingList = async () => {
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				await SubscribeToMailingList.call(factory.value)
				factory.value.reset()
				setLoading(false)
				setMessage('Subscribed successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, subscribeToMailingList }
}

export const useAdminRoles = () => {
	const state = reactive({
		fetched: false,
		upgrading: false,
		email: '',
		users: reactive([]) as UserEntity[]
	})
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const getUsersByEmail = async () => {
		if (state.email) {
			setLoading(true)
			try {
				state.users = reactive(await GetUsersByEmail.call(state.email))
				state.fetched = true
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	const adminUser = async (user: UserEntity) => {
		state.upgrading = true
		try {
			await MakeAdmin.call(user.id)
			setMessage('Successfully upgraded to admin')
			state.users
				.find((u) => u.id === user.id)!.roles.isAdmin = true
		} catch (error) { setError(error) }
		state.upgrading = false
	}

	const deAdminUser = async (user: UserEntity) => {
		state.upgrading = true
		try {
			await RemoveAdmin.call(user.id)
			setMessage('Successfully downgraded from admin')
			state.users
				.find((u) => u.id === user.id)!.roles.isAdmin = false
		} catch (error) { setError(error) }
		state.upgrading = false
	}

	const reset = () => {
		state.email = ''
		state.users = reactive([])
		state.fetched = false
	}

	return {
		...toRefs(state), error, loading,
		getUsersByEmail, adminUser, deAdminUser, reset
	}
}
