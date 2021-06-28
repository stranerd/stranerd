import { computed, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetAllTutors, ListenToTutors, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	tutors: ssrRef([] as UserEntity[]),
	fetched: ssrRef(false),
	subjectId: ssrRef(''),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToTutorsList = (tutor: UserEntity) => {
	const index = global.tutors.value.findIndex((t) => t.id === tutor.id)
	if (index !== -1) global.tutors.value.splice(index, 1, tutor)
	else global.tutors.value.push(tutor)
}

const unshiftToTutorsList = (tutor: UserEntity) => {
	const index = global.tutors.value.findIndex((t) => t.id === tutor.id)
	if (index !== -1) global.tutors.value.splice(index, 1, tutor)
	else global.tutors.value.unshift(tutor)
}

export const useTutorsList = () => {
	const fetchTutors = async () => {
		global.setError('')
		try {
			global.setLoading(true)
			const tutors = await GetAllTutors.call()
			tutors.forEach(pushToTutorsList)
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}
	const tutors = computed({
		get: () => global.tutors.value.sort((first, second) => {
			if (first.orderRating > second.orderRating) return -1
			else if (first.orderRating < second.orderRating) return 1
			else if (first.ratingCount > second.ratingCount) return -1
			else if (first.ratingCount < second.ratingCount) return 1
			else return 0
		}), set: (tutors) => { tutors.map(pushToTutorsList) }
	})
	const filteredTutors = computed({
		get: () => tutors.value.filter((tutor) => {
			let matched = true
			if (global.subjectId.value && tutor.subject?.id !== global.subjectId.value) matched = false
			return matched
		}),
		set: (tutors) => { tutors.map(pushToTutorsList) }
	})
	const listener = useListener(async () => {
		const appendTutors = (tutors: UserEntity[]) => { tutors.map(unshiftToTutorsList) }
		return await ListenToTutors.call(appendTutors)
	})

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTutors()
	})

	return { ...global, tutors, listener, filteredTutors }
}
