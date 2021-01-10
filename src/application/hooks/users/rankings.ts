import { reqSsrRef, useFetch } from '@nuxtjs/composition-api'
import { GetTopRankingUsers, ListenToTopRankingUsers, UserEntity, RankingPeriods } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = Object.fromEntries(
	Object.keys(RankingPeriods)
		.map((key) => [key, {
			users: reqSsrRef([] as UserEntity[]),
			fetched: reqSsrRef(false),
			...useErrorHandler(),
			...useLoadingHandler()
		}])
)

const sortUsers = (users: UserEntity[], period: RankingPeriods) => users.sort((a, b) => b.rankings[period] - a.rankings[period])

export const useTopUsersByPeriod = (period: RankingPeriods) => {
	const fetchUsers = async () => {
		global[period].setError('')
		try {
			global[period].setLoading(true)
			global[period].users.value = sortUsers(await GetTopRankingUsers.call(period), period)
			global[period].fetched.value = true
		} catch (error) { global[period].setError(error) }
		global[period].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (users: UserEntity[]) => global[period].users.value = sortUsers(users, period)
		return await ListenToTopRankingUsers.call(period, callback)
	})

	if (!global[period].fetched.value) useFetch(fetchUsers)

	return {
		error: global[period].error,
		loading: global[period].loading,
		users: global[period].users,
		listener
	}
}
