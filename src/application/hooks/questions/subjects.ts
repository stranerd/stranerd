import { computed, Ref, ref, reqSsrRef, useFetch } from '@nuxtjs/composition-api'
import {
	GetSubjects, AddSubject, FindSubject, DeleteSubject,
	UpdateSubject, SubjectEntity, SubjectFactory
} from '@modules/questions'
import { useCreateModal, useEditModal } from '@app/hooks/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { Alert } from '@app/hooks/core/notifications'

const global = {
	fetched: reqSsrRef(false),
	subjects: reqSsrRef([] as SubjectEntity[])
}
const { error, setError: setGlobalError } = useErrorHandler()
const { loading, setLoading: setGlobalLoading } = useLoadingHandler()

const pushToGlobalSubjects = (subject: SubjectEntity) => {
	const index = global.subjects.value.findIndex((s) => s.id === subject.id)
	if (index !== -1) global.subjects.value.splice(index, 1, subject)
	else global.subjects.value.push(subject)
}

const fetchSubjects = async () => {
	setGlobalError('')
	setGlobalLoading(true)
	try {
		global.subjects.value = await GetSubjects.call()
		global.fetched.value = true
	} catch (error) { setGlobalError(error) }
	setGlobalLoading(false)
}

export const useSubjectList = () => {
	useFetch(async () => {
		if (!global.fetched.value) await fetchSubjects()
	})

	return { ...global, error, loading }
}

export const useSubject = (id: string) => {
	const subject = computed({
		get: () => global.subjects.value.find((s) => s.id === id) ?? null,
		set: () => {}
	})
	useFetch(async () => {
		if (!global.fetched.value) await fetchSubjects()
	})

	return { subject }
}

export const useCreateSubject = () => {
	const factory = ref(new SubjectFactory()) as Ref<SubjectFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createSubject = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				const id = await AddSubject.call(factory.value)
				const subject = await FindSubject.call(id) ?? undefined
				if (subject) pushToGlobalSubjects(subject)
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

export const useEditSubject = (subject = currentSubject) => {
	const factory = ref(new SubjectFactory()) as Ref<SubjectFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (subject) factory.value.loadEntity(subject)

	const editSubject = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			setLoading(true)
			try {
				if (subject) {
					await UpdateSubject.call(subject.id, factory.value)
					const s = await FindSubject.call(subject.id)
					if (s) pushToGlobalSubjects(s)
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
