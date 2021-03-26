import { ssrRef } from '@nuxtjs/composition-api'
import { Notify } from '@app/hooks/core/notifications'
import { isClient } from '@utils/environment'

export const useErrorHandler = () => {
	const errorState = ssrRef('')
	const setError = (error: any) => {
		errorState.value = error.message ?? error
		if (isClient() && errorState.value) Notify({
			title: errorState.value,
			icon: 'error'
		})
	}
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = ssrRef('')
	const setMessage = (message: string) => {
		successState.value = message
		if (isClient() && successState.value) Notify({
			title: successState.value,
			icon: 'success'
		})
	}
	return { message: successState, setMessage }
}

export const useLoadingHandler = () => {
	const loadingState = ssrRef(false)
	const setLoading = (loading: boolean) => loadingState.value = loading
	return { loading: loadingState, setLoading }
}

export const useListener = (start: () => Promise<() => void>) => {
	let listener = null as null | (() => void)
	const startListener = async () => listener = await start()
	const closeListener = () => listener?.()
	const resetListener = async (reset: () => Promise<() => void>) => {
		start = reset
		if (listener) {
			closeListener()
			await startListener()
		}
	}
	return { startListener, closeListener, resetListener }
}
