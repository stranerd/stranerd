import { ssrRef, useFetch } from '@nuxtjs/composition-api'
import {
	AddAnswerReport,
	AnswerReportEntity,
	DeleteAnswerReport,
	GetAnswerReports,
	ReportFactory,
	ReportType
} from '@modules/reports'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useReportModal } from '@app/hooks/core/modals'
import { Alert } from '../core/notifications'

let reportedEntity = null as string | null
export const setReportedEntity = (answerId: string) => reportedEntity = answerId

export const useCreateReport = () => {
	const factory = ssrRef(new ReportFactory())
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	factory.value.type = ReportType.answers
	factory.value.reportedId = reportedEntity!

	const createReport = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddAnswerReport.call(factory.value)
				useReportModal().closeReportAnswer()
				factory.value.reset()
				setMessage('Report sent successfully')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, message,
		createReport
	}
}

const global = {
	reports: ssrRef([] as AnswerReportEntity[]),
	fetched: ssrRef(false),
	hasMore: ssrRef(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToReportList = (report: AnswerReportEntity) => {
	const index = global.reports.value.findIndex((r) => r.id === report.id)
	if (index !== -1) global.reports.value.splice(index, 1, report)
	else global.reports.value.push(report)
}

export const useReportsList = () => {
	const fetchReports = async () => {
		global.setError('')
		try {
			global.setLoading(true)
			const lastDate = global.reports.value[global.reports.value.length - 1]?.createdAt
			const reports = await GetAnswerReports.call(lastDate)
			global.hasMore.value = !!reports.pages.next
			reports.results.forEach(pushToReportList)
			global.fetched.value = true
		} catch (error) {
			global.setError(error)
		}
		global.setLoading(false)
	}

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchReports()
	})

	return { ...global, fetchOlderReports: fetchReports }
}

export const useDeleteReport = (id: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteReport = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this report?',
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			setLoading(true)
			try {
				await DeleteAnswerReport.call(id)
				global.reports.value = global.reports.value
					.filter((r) => r.id !== id)
				setMessage('Report deleted successfully')
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		}
	}

	return { loading, error, deleteReport }
}
