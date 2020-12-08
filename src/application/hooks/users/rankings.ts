import { computed, ref, reqRef, useFetch } from '@nuxtjs/composition-api'
import {
	GetTopDailyUsers, GetTopMonthlyUsers, GetTopQuarterlyUsers, GetTopWeeklyUsers, ListenToTopDailyUsers,
	ListenToTopMonthlyUsers, ListenToTopQuarterlyUsers, ListenToTopWeeklyUsers, UserEntity
} from '@modules/users'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	daily: {
		users: reqRef([] as UserEntity[]),
		listener: reqRef(null as null | (() => void)),
		fetched: reqRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	weekly: {
		users: reqRef([] as UserEntity[]),
		listener: reqRef(null as null | (() => void)),
		fetched: reqRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	monthly: {
		users: reqRef([] as UserEntity[]),
		listener: reqRef(null as null | (() => void)),
		fetched: reqRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	quarterly: {
		users: reqRef([] as UserEntity[]),
		listener: reqRef(null as null | (() => void)),
		fetched: reqRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}
}

export const useTopDailyUsers = () => {
	const fetchUsers = async () => {
		global.daily.setError('')
		try {
			global.daily.setLoading(true)
			global.daily.users.value = await GetTopDailyUsers.call()
			global.daily.fetched.value = true
		} catch (error) { global.daily.setError(error) }
		global.daily.setLoading(false)
	}

	const startListener = async () => {
		global.daily.setError('')
		try {
			global.daily.setLoading(true)
			const callback = (users: UserEntity[]) => global.daily.users.value = users
			global.daily.listener.value = await ListenToTopDailyUsers.call(callback)
		} catch (error) { global.daily.setError(error) }
		global.daily.setLoading(false)
	}

	// TODO: Figure out why useFetch hook doesn't work
	if (!global.daily.fetched.value) fetchUsers()

	return {
		error: global.daily.error,
		loading: global.daily.loading,
		users: global.daily.users,
		startListener,
		closeListener: () => global.daily.listener.value?.()
	}
}

export const useTopWeeklyUsers = () => {
	const fetchUsers = async () => {
		global.weekly.setError('')
		try {
			global.weekly.setLoading(true)
			global.weekly.users.value = await GetTopWeeklyUsers.call()
			global.weekly.fetched.value = true
		} catch (error) { global.weekly.setError(error) }
		global.weekly.setLoading(false)
	}

	const startListener = async () => {
		global.weekly.setError('')
		try {
			global.weekly.setLoading(true)
			const callback = (users: UserEntity[]) => global.weekly.users.value = users
			global.weekly.listener.value = await ListenToTopWeeklyUsers.call(callback)
		} catch (error) { global.weekly.setError(error) }
		global.weekly.setLoading(false)
	}

	if (!global.weekly.fetched.value) useFetch(fetchUsers)

	return {
		error: global.weekly.error,
		loading: global.weekly.loading,
		users: global.weekly.users,
		startListener,
		closeListener: () => global.weekly.listener.value?.()
	}
}

export const useTopMonthlyUsers = () => {
	const fetchUsers = async () => {
		global.monthly.setError('')
		try {
			global.monthly.setLoading(true)
			global.monthly.users.value = await GetTopMonthlyUsers.call()
			global.monthly.fetched.value = true
		} catch (error) { global.monthly.setError(error) }
		global.monthly.setLoading(false)
	}

	const startListener = async () => {
		global.monthly.setError('')
		try {
			global.monthly.setLoading(true)
			const callback = (users: UserEntity[]) => global.monthly.users.value = users
			global.monthly.listener.value = await ListenToTopMonthlyUsers.call(callback)
		} catch (error) { global.monthly.setError(error) }
		global.monthly.setLoading(false)
	}

	if (!global.monthly.fetched.value) useFetch(fetchUsers)

	return {
		error: global.monthly.error,
		loading: global.monthly.loading,
		users: global.monthly.users,
		startListener,
		closeListener: () => global.monthly.listener.value?.()
	}
}

export const useTopQuarterlyUsers = () => {
	const fetchUsers = async () => {
		global.quarterly.setError('')
		try {
			global.quarterly.setLoading(true)
			global.quarterly.users.value = await GetTopQuarterlyUsers.call()
			global.quarterly.fetched.value = true
		} catch (error) { global.quarterly.setError(error) }
		global.quarterly.setLoading(false)
	}

	const startListener = async () => {
		global.quarterly.setError('')
		try {
			global.quarterly.setLoading(true)
			const callback = (users: UserEntity[]) => global.quarterly.users.value = users
			global.quarterly.listener.value = await ListenToTopQuarterlyUsers.call(callback)
		} catch (error) { global.quarterly.setError(error) }
		global.quarterly.setLoading(false)
	}

	if (!global.quarterly.fetched.value) useFetch(fetchUsers)

	return {
		error: global.quarterly.error,
		loading: global.quarterly.loading,
		users: global.quarterly.users,
		startListener,
		closeListener: () => global.quarterly.listener.value?.()
	}
}

export const useTopUsers = () => {
	const options = ['daily', 'weekly', 'monthly', 'quarterly']
	const option = ref(options[0])
	const isDaily = computed({
		get: () => option.value === 'daily',
		set: () => {}
	})
	const isWeekly = computed({
		get: () => option.value === 'weekly',
		set: () => {}
	})
	const isMonthly = computed({
		get: () => option.value === 'monthly',
		set: () => {}
	})
	const isQuarterly = computed({
		get: () => option.value === 'quarterly',
		set: () => {}
	})
	return { options, option, isDaily, isWeekly, isMonthly, isQuarterly }
}
