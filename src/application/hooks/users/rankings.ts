import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetTopRankingUsers, ListenToTopRankingUsers, UserEntity, RankingPeriods } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<RankingPeriods, {
	users: Ref<UserEntity[]>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>
const sortUsers = (users: UserEntity[], period: RankingPeriods) => users.sort((a, b) => b.rankings[period] - a.rankings[period])

export const useTopUsersByPeriod = (period: RankingPeriods) => {
	if (global[period] === undefined) {
		global[period] = {
			users: ssrRef([] as UserEntity[]),
			fetched: ssrRef(false),
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchUsers = async () => {
		global[period].setError('')
		try {
			global[period].setLoading(true)
			const users = await GetTopRankingUsers.call(period)
			global[period].users.value = sortUsers(users, period)
			global[period].fetched.value = true
		} catch (error) { global[period].setError(error) }
		global[period].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (users: UserEntity[]) => global[period].users.value = sortUsers(users, period)
		return await ListenToTopRankingUsers.call(period, callback)
	})

	useFetch(async () => {
		if (!global[period].fetched.value) await fetchUsers()
	})

	return {
		error: global[period].error,
		loading: global[period].loading,
		users: global[period].users,
		listener
	}
}
