import { computed, reqRef, useFetch } from '@nuxtjs/composition-api'
import { GetAllSessionTutors, ListenToAllSessionTutors, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	tutors: reqRef([] as UserEntity[]),
	fetched: reqRef(false),
	subjectId: reqRef(''),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const useTutorsList = () => {
	const fetchTutors = async () => {
		global.setError('')
		try {
			global.setLoading(true)
			global.tutors.value = await GetAllSessionTutors.call()
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}
	const filteredTutors = computed({
		get: () => global.tutors.value
			.sort((a, b) => a.orderRating > b.orderRating ? -1 : a.orderRating === b.orderRating ? 0 : 1)
			.filter((tutor) => {
				let matched = true
				if (global.subjectId.value && !tutor.subjects.find((s) => s.id === global.subjectId.value)) matched = false
				return matched
			}),
		set: (tutors) => { global.tutors.value = tutors }
	})
	const listener = useListener(async () => {
		const appendTutors = (tutors: UserEntity[]) => { global.tutors.value = tutors }
		return await ListenToAllSessionTutors.call(appendTutors)
	})

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTutors()
	})

	return { ...global, listener, filteredTutors }
}
