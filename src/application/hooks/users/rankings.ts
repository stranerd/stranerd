import { computed, ssrRef, useFetch } from '@nuxtjs/composition-api'
import {
	GetTopDailyUsers, GetTopMonthlyUsers, GetTopQuarterlyUsers, GetTopWeeklyUsers, ListenToTopDailyUsers,
	ListenToTopMonthlyUsers, ListenToTopQuarterlyUsers, ListenToTopWeeklyUsers, UserEntity
} from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	daily: {
		users: ssrRef([] as UserEntity[]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	weekly: {
		users: ssrRef([] as UserEntity[]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	monthly: {
		users: ssrRef([] as UserEntity[]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	},
	quarterly: {
		users: ssrRef([] as UserEntity[]),
		fetched: ssrRef(false),
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
		users: computed({
			get: () => global.daily.users.value.sort((a, b) => b.rankings.daily - a.rankings.daily),
			set: () => {}
		}),
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
		users: computed({
			get: () => global.weekly.users.value.sort((a, b) => b.rankings.weekly - a.rankings.weekly),
			set: () => {}
		}),
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
		users: computed({
			get: () => global.monthly.users.value.sort((a, b) => b.rankings.monthly - a.rankings.monthly),
			set: () => {}
		}),
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
		users: computed({
			get: () => global.quarterly.users.value.sort((a, b) => b.rankings.quarterly - a.rankings.quarterly),
			set: () => {}
		}),
		listener
	}
}

export const useTopUsers = () => {
	const options = ['daily', 'weekly', 'monthly', 'quarterly']
	const option = ssrRef(options[0])
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
