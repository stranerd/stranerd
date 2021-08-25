import { computed, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetAllSessionTutors, ListenToAllSessionTutors, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	tutors: ssrRef([] as UserEntity[]),
	fetched: ssrRef(false),
	subjectId: ssrRef(''),
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
		} catch (error) {
			global.setError(error)
		}
		global.setLoading(false)
	}
	const filteredTutors = computed({
		get: () => global.tutors.value
			// TODO: Check if sorting is cause of empty flash in prod
			.sort((a, b) => a.score > b.score ? -1 : a.score === b.score ? 0 : 1)
			.filter((tutor) => {
				if (global.subjectId.value && !tutor.subjects.find((s) => s.id === global.subjectId.value)) return false
				return true
			}), // .slice(0, 50),
		set: (tutors) => {
			tutors?.forEach?.((t) => {
				const index = global.tutors.value.findIndex((x) => x.id === t.id)
				if (index === -1) global.tutors.value.push(t)
				else global.tutors.value.splice(index, 1, t)
			})
		}
	})
	const listener = useListener(async () => {
		const appendTutors = (tutors: UserEntity[]) => {
			global.tutors.value = tutors
		}
		return await ListenToAllSessionTutors.call(appendTutors)
	})

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTutors()
	})

	return { ...global, listener, filteredTutors }
}
