import { ssrRef, watch } from '@nuxtjs/composition-api'
import { AnswerReportFactory, AddAnswerReport, AnswerReportType } from '@modules/reports'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useReportModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { AnswerEntity } from '@modules/questions'

let reportedEntity = null as { id: string, reported: AnswerReportType } | null
export const setReportedEntity = (answer: AnswerEntity) => {
	reportedEntity = {
		id: answer.id,
		reported: {
			title: answer.title,
			body: answer.body,
			questionId: answer.questionId
		}
	}
}

export const useCreateReport = () => {
	const { id, bio } = useAuth()
	const factory = ssrRef(new AnswerReportFactory())
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
				await AddAnswerReport.call(factory.value)
				useReportModal().closeReportAnswer()
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
