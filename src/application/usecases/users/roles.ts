import { reactive, toRefs } from '@vue/composition-api'
import {
	GetUsersByEmail, GetMailingListFactory, SubscribeToMailingList,
	MakeAdmin, RemoveAdmin
} from '@modules/users'
import { UserEntity } from '@modules/users/domain/entities/user'
import { useErrorHandler, useSuccessHandler } from '@app/usecases/core/states'

export const useMailingList = () => {
	const state = reactive({
		loading: false,
		factory: GetMailingListFactory.call()
	})
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const subscribeToMailingList = async () => {
		if (state.factory.valid && !state.loading) {
			state.loading = true
			try {
				await SubscribeToMailingList.call(state.factory)
				state.factory.reset()
				state.loading = false
				setMessage('Subscribed successfully')
			} catch (error) { setError(error) }
			state.loading = false
		} else state.factory.validateAll()
	}

	return { ...toRefs(state), error, subscribeToMailingList }
}

export const useAdminRoles = () => {
	const state = reactive({
		loading: false,
		fetched: false,
		upgrading: false,
		email: '',
		users: reactive([]) as UserEntity[]
	})
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const getUsersByEmail = async () => {
		if (state.email) {
			state.loading = true
			try {
				state.users = reactive(await GetUsersByEmail.call(state.email))
				state.fetched = true
			} catch (error) { setError(error) }
			state.loading = false
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
		...toRefs(state), error,
		getUsersByEmail, adminUser, deAdminUser, reset
	}
}
