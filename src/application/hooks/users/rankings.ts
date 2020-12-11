import { computed, ref, reqSsrRef, useFetch } from '@nuxtjs/composition-api'
import {
	GetTopDailyUsers, GetTopMonthlyUsers, GetTopQuarterlyUsers, GetTopWeeklyUsers, ListenToTopDailyUsers,
	ListenToTopMonthlyUsers, ListenToTopQuarterlyUsers, ListenToTopWeeklyUsers, UserEntity
} from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	daily: {
		users: reqSsrRef([] as UserEntity[]),
		fetched: reqSsrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	weekly: {
		users: reqSsrRef([] as UserEntity[]),
		fetched: reqSsrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	monthly: {
		users: reqSsrRef([] as UserEntity[]),
		fetched: reqSsrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	quarterly: {
		users: reqSsrRef([] as UserEntity[]),
		fetched: reqSsrRef(false),
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

	const listener = useListener(async () => {
		const callback = (users: UserEntity[]) => global.daily.users.value = users
		return await ListenToTopDailyUsers.call(callback)
	})

	if (!global.daily.fetched.value) useFetch(fetchUsers)

	return {
		error: global.daily.error,
		loading: global.daily.loading,
		users: global.daily.users,
		listener
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

	const listener = useListener(async () => {
		const callback = (users: UserEntity[]) => global.weekly.users.value = users
		return await ListenToTopWeeklyUsers.call(callback)
	})

	if (!global.weekly.fetched.value) useFetch(fetchUsers)

	return {
		error: global.weekly.error,
		loading: global.weekly.loading,
		users: global.weekly.users,
		listener
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

	const listener = useListener(async () => {
		const callback = (users: UserEntity[]) => global.monthly.users.value = users
		return await ListenToTopMonthlyUsers.call(callback)
	})

	if (!global.monthly.fetched.value) useFetch(fetchUsers)

	return {
		error: global.monthly.error,
		loading: global.monthly.loading,
		users: global.monthly.users,
		listener
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

	const listener = useListener(async () => {
		const callback = (users: UserEntity[]) => global.quarterly.users.value = users
		return await ListenToTopQuarterlyUsers.call(callback)
	})

	if (!global.quarterly.fetched.value) useFetch(fetchUsers)

	return {
		error: global.quarterly.error,
		loading: global.quarterly.loading,
		users: global.quarterly.users,
		listener
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
