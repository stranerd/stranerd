import { computed, ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetAllTutors, ListenToTutors, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { isServer } from '@utils/environment'

const global = {
	tutors: ssrRef([] as UserEntity[]),
	fetched: ssrRef(false),
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
	const subjectId = ref('')
	const fetchTutors = async () => {
		global.setError('')
		if (isServer()) global.tutors.value = []
		try {
			global.setLoading(true)
			const tutors = await GetAllTutors.call()
			tutors.forEach(pushToTutorsList)
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}
	const filteredTutors = computed({
		get: () => global.tutors.value.filter((tutor) => {
			let matched = true
			if (subjectId.value && !tutor.subjects.find((s) => s.id === subjectId.value)) matched = false
			return matched
		}),
		set: () => {}
	})
	const listener = useListener(async () => {
		const appendTutors = (tutors: UserEntity[]) => { tutors.map(unshiftToTutorsList) }
		return await ListenToTutors.call(appendTutors)
	})

	if (!global.fetched.value || isServer()) useFetch(fetchTutors)

	return {
		...global, listener,
		subjectId, filteredTutors
	}
}
