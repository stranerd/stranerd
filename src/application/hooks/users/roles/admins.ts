import { computed, reactive, ssrRef, toRefs, useFetch } from '@nuxtjs/composition-api'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { GetAllAdmins, GetUsersByEmail, MakeAdmin, RemoveAdmin, UserEntity } from '@modules/users'
import { useAuth } from '@app/hooks/auth/auth'

const global = {
	admins: ssrRef([] as UserEntity[]),
	fetched: ssrRef(false),
	subjectId: ssrRef(''),
	...useErrorHandler(),
	...useLoadingHandler()
}
const { id } = useAuth()

const pushToAdminsList = (admin: UserEntity) => {
	const index = global.admins.value.findIndex((t) => t.id === admin.id)
	if (index !== -1) global.admins.value.splice(index, 1, admin)
	else global.admins.value.push(admin)
}

export const useAdminsList = () => {
	const fetchAdmins = async () => {
		global.setError('')
		try {
			global.setLoading(true)
			const admins = await GetAllAdmins.call()
			admins.forEach(pushToAdminsList)
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}
	const filteredAdmins = computed({
		get: () => global.admins.value.filter((admin) => {
			let matched = true
			if (admin.id === id.value) matched = false
			return matched
		}),
		set: () => {}
	})
	const listener = useListener(async () => () => {})

	useFetch(async () => {
		if (!global.fetched.value) await fetchAdmins()
	})

	return { ...global, listener, filteredAdmins }
}

export const useAdminRoles = () => {
	const state = reactive({
		fetched: false,
		email: '',
		users: [] as UserEntity[]
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
		state.users.length = 0
		state.fetched = false
	}

	const adminUser = async (user: UserEntity) => {
		setError('')
		setLoading(true)
		try {
			await MakeAdmin.call(user.id)
			user.roles.isAdmin = true
			pushToAdminsList(user)
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
