import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { reqRef, watch } from '@nuxtjs/composition-api'
import { ProfileUpdateFactory, UpdateProfile } from '@modules/auth'
import { useAuth } from '@app/hooks/auth/auth'

export const useUpdateProfile = () => {
	const factory = reqRef(new ProfileUpdateFactory())
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()
	const { id, bio } = useAuth()

	if (bio.value) factory.value.loadEntity(bio.value)
	watch(() => bio.value?.name, () => bio.value?.name ? factory.value.name = bio.value.name : null)
	watch(() => bio.value?.email, () => bio.value?.email ? factory.value.email = bio.value.email : null)
	watch(() => bio.value?.description, () => bio.value?.description ? factory.value.description = bio.value.description : null)
	watch(() => bio.value?.image, () => bio.value?.image ? factory.value.image = bio.value.image : null)

	const updateProfile = async () => {
		setError('')
		if (id.value && factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await UpdateProfile.call(id.value, factory.value)
				setMessage('Profile updated successfully!')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		error, loading, message,
		factory,
		updateProfile
	}
}
