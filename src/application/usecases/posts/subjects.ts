import { reqRef, useFetch } from '@nuxtjs/composition-api'
import { GetSubjects, AddSubject, GetSubjectFactory, FindSubject, DeleteSubject, UpdateSubject } from '@modules/posts'
import { SubjectEntity } from '@modules/posts/domain/entities/subject'
import { useCreateModal, useEditModal } from '@app/usecases/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/usecases/core/states'
import { Alert } from '@app/usecases/core/notifications'

const global = {
	fetched: reqRef(false),
	subjects: reqRef([] as SubjectEntity[])
}
const { error, setError: setGlobalError } = useErrorHandler()
const { loading, setLoading: setGlobalLoading } = useLoadingHandler()

export const useSubjectList = () => {
	const fetchSubjects = async () => {
		setGlobalError('')
		if (!global.fetched.value) {
			setGlobalLoading(true)
			try {
				global.subjects.value = await GetSubjects.call()
				global.fetched.value = true
			} catch (error) { setGlobalError(error) }
			setGlobalLoading(false)
		}
	}
	useFetch(fetchSubjects)

	return { ...global, error, loading }
}

const fetchSubject = async (id: string) => {
	let subject = global.subjects.value.find((subject) => subject.id === id)
	if (subject) return subject
	subject = await FindSubject.call(id) ?? undefined
	if (subject) global.subjects.value.unshift(subject)
	return subject
}

export const useCreateSubject = () => {
	const factory = reqRef(GetSubjectFactory.call())
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createSubject = async () => {
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const id = await AddSubject.call(factory.value)
				await fetchSubject(id)
				factory.value.reset()
				useCreateModal().closeCreateModal()
				setMessage('Subject created successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createSubject }
}

export const useDeleteSubject = (subject: SubjectEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteSubject = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this subject?',
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			setLoading(true)
			try {
				await DeleteSubject.call(subject.id)
				global.subjects.value = global.subjects.value
					.filter((s) => s.id !== subject.id)
				setMessage('Subject deleted successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { loading, error, deleteSubject }
}

let currentSubject = null as SubjectEntity | null
export const setCurrentSubject = (subject: SubjectEntity) => currentSubject = subject

export const useEditSubject = (subject = currentSubject!) => {
	const factory = reqRef(GetSubjectFactory.call())
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (subject) factory.value.loadEntity(subject)

	const editSubject = async () => {
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				if (subject.id) {
					await UpdateSubject.call(subject.id, factory.value)
				}
				factory.value.reset()
				useEditModal().closeEditModal()
				setMessage('Subject updated successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, editSubject }
}
