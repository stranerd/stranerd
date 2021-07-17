import { computed, ref, Ref, reqRef, useFetch } from '@nuxtjs/composition-api'
import {
	GetSubjects, AddSubject, FindSubject, DeleteSubject,
	SubjectEntity, SubjectFactory
} from '@modules/questions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { Alert } from '@app/hooks/core/notifications'

const global = {
	fetched: reqRef(false),
	subjects: reqRef([] as SubjectEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToGlobalSubjects = (subject: SubjectEntity) => {
	const index = global.subjects.value.findIndex((s) => s.id === subject.id)
	if (index !== -1) global.subjects.value.splice(index, 1, subject)
	else global.subjects.value.push(subject)
}

const fetchSubjects = async () => {
	global.setError('')
	global.setLoading(true)
	try {
		global.subjects.value = await GetSubjects.call()
		global.fetched.value = true
	} catch (error) { global.setError(error) }
	global.setLoading(false)
}

export const useSubjectList = () => {
	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchSubjects()
	})

	return { ...global }
}

export const useSubject = (id: string) => {
	const subject = computed({
		get: () => global.subjects.value.find((s) => s.id === id) ?? null,
		set: (s) => { if (s) pushToGlobalSubjects(s) }
	})
	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchSubjects()
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
				const subject = await FindSubject.call(id)
				if (subject) pushToGlobalSubjects(subject)
				factory.value.reset()
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
