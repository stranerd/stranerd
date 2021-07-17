import { ssrRef, watch } from '@nuxtjs/composition-api'
import { QuestionReportFactory, AddQuestionReport, QuestionReportType } from '@modules/reports'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useReportModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { QuestionEntity } from '@modules/questions'

let reportedEntity = null as { id: string, reported: QuestionReportType } | null
export const setReportedEntity = (question: QuestionEntity) => {
	reportedEntity = {
		id: question.id,
		reported: {
			body: question.body
		}
	}
}

export const useCreateReport = () => {
	const { id, bio } = useAuth()
	const factory = ssrRef(new QuestionReportFactory())
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
				await AddQuestionReport.call(factory.value)
				useReportModal().closeReportQuestion()
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
