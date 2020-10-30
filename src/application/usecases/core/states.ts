import { reqRef, watch } from '@nuxtjs/composition-api'
import { Notify } from '@app/usecases/core/notifications'

export const useErrorHandler = () => {
	const errorState = reqRef('')
	watch(() => errorState.value, async () => {
		if (errorState.value) await Notify({
			title: errorState.value,
			icon: 'error'
		})
	})
	const setError = (error: any) => errorState.value = error.message ?? error
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = reqRef('')
	watch(() => successState.value, async () => {
		if (successState.value) await Notify({
			title: successState.value,
			icon: 'success'
		})
	})
	const setMessage = (message: string) => successState.value = message
	return { message: successState, setMessage }
}

export const useLoadingHandler = () => {
	const loadingState = reqRef(false)
	const setLoading = (loading: boolean) => loadingState.value = loading
	return { loading: loadingState, setLoading }
}
