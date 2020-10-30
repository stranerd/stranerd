import { reactive, reqRef, toRefs, useFetch } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users/domain/entities/user'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/usecases/core/states'
import { GetAllAdmins, GetUsersByEmail, MakeAdmin, RemoveAdmin } from '@modules/users'

export const useAdminRoles = () => {
	const state = reactive({
		fetched: false,
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

	const reset = () => {
		state.email = ''
		state.users = reactive([])
		state.fetched = false
	}

	const adminUser = async (user: UserEntity) => {
		setError('')
		setLoading(true)
		try {
			await MakeAdmin.call(user.id)
			user.roles.isAdmin = true
			global.admins.value.push(user)
			reset()
			setMessage('Successfully upgraded to admin')
		} catch (error) { setError(error) }
		setLoading(false)
	}

	const deAdminUser = async (user: UserEntity) => {
		setError('')
		setLoading(true)
		try {
			await RemoveAdmin.call(user.id)
			global.admins.value = global.admins.value
				.filter((u) => u.id !== user.id)
			setMessage('Successfully downgraded from admin')
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return {
		...toRefs(state), error, loading,
		getUsersByEmail, adminUser, deAdminUser, reset
	}
}

const global = {
	fetched: reqRef(false),
	admins: reqRef([] as UserEntity[])
}
const { error, setError } = useErrorHandler()
const { loading, setLoading } = useLoadingHandler()

export const useAdminList = () => {
	const fetchAdmins = async () => {
		setError('')
		if (!global.fetched.value) {
			setLoading(true)
			try {
				global.admins.value = await GetAllAdmins.call()
				global.fetched.value = true
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}
	useFetch(fetchAdmins)

	return { ...global, error, loading }
}
