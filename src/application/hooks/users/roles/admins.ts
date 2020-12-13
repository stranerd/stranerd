import { reactive, reqSsrRef, toRefs, useFetch } from '@nuxtjs/composition-api'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { GetAllAdmins, GetUsersByEmail, MakeAdmin, RemoveAdmin, UserEntity } from '@modules/users'

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
			addToGlobalAdmins(user)
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
	fetched: reqSsrRef(false),
	admins: reqSsrRef([] as UserEntity[])
}
const { error, setError } = useErrorHandler()
const { loading, setLoading } = useLoadingHandler()

const addToGlobalAdmins = (user: UserEntity) => {
	const index = global.admins.value.findIndex((u) => u.id === user.id)
	if (index !== -1) global.admins.value.splice(index, 1, user)
	else global.admins.value.push(user)
}

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
