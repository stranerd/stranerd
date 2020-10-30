import { reactive, reqRef, toRefs, useFetch } from '@nuxtjs/composition-api'
import { FindTutor, GetTutors, GetUsersByEmail, MakeTutor, RemoveTutor } from '@modules/users'
import { TutorEntity } from '@modules/users/domain/entities/tutor'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/usecases/core/states'
import { UserEntity } from '@modules/users/domain/entities/user'
import { Alert } from '@app/usecases/core/notifications'

const global = {
	fetched: reqRef(false),
	tutors: reqRef([] as TutorEntity[])
}
const { error, setError } = useErrorHandler()
const { loading, setLoading } = useLoadingHandler()

export const useTutorList = () => {
	const fetchTutors = async () => {
		setError('')
		if (!global.fetched.value) {
			setLoading(true)
			try {
				global.tutors.value = await GetTutors.call()
				global.fetched.value = true
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}
	useFetch(fetchTutors)

	return { ...global, error, loading }
}

export const useTutorRoles = () => {
	const state = reactive({
		fetched: false,
		email: '',
		users: reactive([]) as UserEntity[]
	})
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const getUsersByEmail = async () => {
		if (state.email) {
			setLoading(true)
			try {
				state.users = reactive(await GetUsersByEmail.call(state.email))
				state.fetched = true
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	const reset = () => {
		state.email = ''
		state.users = reactive([])
		state.fetched = false
	}

	const makeTutor = async (user: UserEntity) => {
		setError('')
		setLoading(true)
		try {
			await MakeTutor.call(user.id)
			user.roles.isTutor = true
			const tutor = await FindTutor.call(user.id)
			if (tutor) global.tutors.value.push(tutor)
			reset()
			setMessage('Successfully made a tutor')
		} catch (error) { setError(error) }
		setLoading(false)
	}

	const removeTutor = async (tutor: TutorEntity) => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this tutor?',
			text: 'Note that this action will delete the tutor\'s records. This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			setLoading(true)
			try {
				await RemoveTutor.call(tutor.id)
				global.tutors.value = global.tutors.value
					.filter((t) => t.id !== tutor.id)
				setMessage('Successfully removed tutor')
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return {
		...toRefs(state), error, loading,
		getUsersByEmail, makeTutor, removeTutor, reset
	}
}
