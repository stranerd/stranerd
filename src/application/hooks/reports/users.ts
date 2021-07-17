import { ssrRef, watch } from '@nuxtjs/composition-api'
import { UserReportFactory, AddUserReport } from '@modules/reports'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useReportModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { UserEntity, UserBio } from '@modules/users'

let reportedEntity = null as { id: string, reported: UserBio } | null
export const setReportedEntity = (user: UserEntity) => {
	reportedEntity = { id: user.id, reported: user.bio }
}

export const useCreateReport = () => {
	const { id, bio } = useAuth()
	const factory = ssrRef(new UserReportFactory())
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	factory.value.reporterBioAndId = { id: id.value!, bio: bio.value! }
	watch(() => id.value, () => factory.value.reporterBioAndId = { id: id.value!, bio: bio.value! })
	watch(() => bio.value, () => factory.value.reporterBioAndId = { id: id.value!, bio: bio.value! })
	factory.value.reported = reportedEntity!

	const createReport = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddUserReport.call(factory.value)
				useReportModal().closeReportUser()
				factory.value.reset()
				setMessage('Report sent successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, message,
		createReport
	}
}