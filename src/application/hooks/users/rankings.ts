import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetTopRankingUsers, ListenToTopRankingUsers, UserEntity, RankingPeriods } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { isServer } from '@utils/environment'

const global = {} as Record<RankingPeriods, {
	users: Ref<UserEntity[]>,
	fetched: Ref<boolean>,
	error: Ref<string>,
	setError: (error: any) => void,
	loading: Ref<boolean>,
	setLoading: (loading: boolean) => void,
}>
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
		if (isServer()) global[period].users.value = []
		try {
			global[period].setLoading(true)
			await new Promise((resolve) => setTimeout(resolve, 5000))
			global[period].users.value = sortUsers(await GetTopRankingUsers.call(period), period)
			global[period].fetched.value = true
		} catch (error) { global[period].setError(error) }
		global[period].setLoading(false)
	}

	const listener = useListener(async () => {
		const callback = (users: UserEntity[]) => global[period].users.value = sortUsers(users, period)
		return await ListenToTopRankingUsers.call(period, callback)
	})

	if (!global[period].fetched.value || isServer()) useFetch(fetchUsers)

	return {
		error: global[period].error,
		loading: global[period].loading,
		users: global[period].users,
		listener
	}
}
