import { useAuth } from '@app/hooks/auth/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { ref, Ref, watch, useRouter } from '@nuxtjs/composition-api'
import { AddTutorApplications, TutorApplicationFactory } from '@modules/users'

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
