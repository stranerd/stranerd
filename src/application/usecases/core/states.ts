import { reqRef } from '@nuxtjs/composition-api'

export const useErrorHandler = () => {
	const errorState = reqRef('')
	const setError = (error: any) => errorState.value = error.message ?? error
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = reqRef('')
	const setMessage = (message: string) => successState.value = message
	return { message: successState, setMessage }
}

export const useLoadingHandler = () => {
	const loadingState = reqRef(false)
	const setLoading = (loading: boolean) => loadingState.value = loading
	return { loading: loadingState, setLoading }
}
