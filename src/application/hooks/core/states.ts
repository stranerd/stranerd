import { reqRef } from '@nuxtjs/composition-api'
import { Notify } from '@app/hooks/core/notifications'

export const useErrorHandler = () => {
	const errorState = reqRef('')
	const setError = (error: any) => {
		errorState.value = error.message ?? error
		if (errorState.value) Notify({
			title: errorState.value,
			icon: 'error'
		})
	}
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = reqRef('')
	const setMessage = (message: string) => {
		successState.value = message
		if (successState.value) Notify({
			title: successState.value,
			icon: 'success'
		})
	}
	return { message: successState, setMessage }
}

export const useLoadingHandler = () => {
	const loadingState = reqRef(false)
	const setLoading = (loading: boolean) => loadingState.value = loading
	return { loading: loadingState, setLoading }
}

export const useListener = (start: () => Promise<() => void>) => {
	let listener = null as null | (() => void)
	const startListener = async () => listener = await start()
	const closeListener = () => listener?.()
	return { startListener, closeListener }
}
