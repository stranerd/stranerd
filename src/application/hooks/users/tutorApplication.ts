import { useAuth } from '@app/hooks/auth/auth'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { ref, Ref, watch, useRouter, ssrRef, useFetch } from '@nuxtjs/composition-api'
import {
	AddTutorApplications, GetTutorApplications, ListenToTutorApplications, TutorApplicationEntity, TutorApplicationFactory
} from '@modules/users'
import { PAGINATION_LIMIT } from '@utils/constants'

const global = {
	applications: ssrRef([] as TutorApplicationEntity[]),
	fetched: ssrRef(false),
	hasMore: ssrRef(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToApplicationList = (application: TutorApplicationEntity) => {
	const index = global.applications.value.findIndex((a) => a.id === application.id)
	if (index !== -1) global.applications.value.splice(index, 1, application)
	else global.applications.value.push(application)
}
const unshiftToApplicationList = (application: TutorApplicationEntity) => {
	const index = global.applications.value.findIndex((a) => a.id === application.id)
	if (index !== -1) global.applications.value.splice(index, 1, application)
	else global.applications.value.unshift(application)
}

export const useTutorApplicationList = () => {
	const fetchApplications = async () => {
		global.setError('')
		try {
			global.setLoading(true)
			const lastDate = global.applications.value[global.applications.value.length - 1]?.createdAt
			const applications = await GetTutorApplications.call(lastDate)
			global.hasMore.value = applications.length === PAGINATION_LIMIT + 1
			applications.slice(0, PAGINATION_LIMIT).forEach(pushToApplicationList)
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}
	const listener = useListener(async () => {
		const appendQuestions = (applications: TutorApplicationEntity[]) => { applications.map(unshiftToApplicationList) }
		const lastDate = global.applications.value[global.applications.value.length - 1]?.createdAt
		return await ListenToTutorApplications.call(appendQuestions, lastDate)
	})

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchApplications()
	})

	return { ...global, listener, fetchOlderApplications: fetchApplications }
}

export const useCreateTutorApplication = () => {
	const { id, bio } = useAuth()
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new TutorApplicationFactory()) as Ref<TutorApplicationFactory>

	factory.value.userBioAndId = { id: id.value!, bio: bio.value! }
	watch(() => id.value, () => factory.value.userBioAndId = { id: id.value!, bio: bio.value! })
	watch(() => bio.value, () => factory.value.userBioAndId = { id: id.value!, bio: bio.value! })

	const createTutorApplication = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddTutorApplications.call(factory.value)
				setMessage('Application submitted successfully')
				router.push('/')
				factory.value.reset()
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createTutorApplication }
}

export const useTutorApplication = (id: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const acceptApplication = async () => {
		setError('')
		try {
			setLoading(true)
			const index = global.applications.value.findIndex((a) => a.id === id)
			if (index !== -1) global.applications.value.splice(index, 1)
			setMessage('Successfully accepted application')
		} catch (error) { setError(error) }
		setLoading(false)
	}
	const rejectApplication = async () => {
		setError('')
		try {
			setLoading(true)
			const index = global.applications.value.findIndex((a) => a.id === id)
			if (index !== -1) global.applications.value.splice(index, 1)
			setMessage('Successfully rejected application')
		} catch (error) { setError(error) }
		setLoading(false)
	}
	return { error, loading, acceptApplication, rejectApplication }
}
