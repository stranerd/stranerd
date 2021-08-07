import { ssrRef } from '@nuxtjs/composition-api'
import { Notify } from '@app/hooks/core/notifications'
import { isClient } from '@utils/environment'
import { analytics } from '@modules/core'

export const useErrorHandler = () => {
	const errorState = ssrRef('')
	const setError = (error: any) => {
		errorState.value = error.message ?? error
		if (isClient() && errorState.value) Notify({
			title: errorState.value,
			icon: 'error'
		})
		if (errorState.value) analytics.logEvent('error', {
			error: errorState.value
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
	const isRunning = ssrRef(false)
	const startListener = async () => {
		closeListener()
		listener = await start()
		isRunning.value = true
	}
	const closeListener = () => {
		listener?.()
		isRunning.value = false
	}
	const resetListener = async (reset: () => Promise<() => void>) => {
		start = reset
		if (isRunning.value) await startListener()
	}
	return { startListener, closeListener, resetListener, isRunning }
}
