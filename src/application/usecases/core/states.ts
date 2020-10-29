import { reqRef } from '@nuxtjs/composition-api'

export const useErrorHandler = () => {
	const errorMessage = reqRef('')

	const setError = (error: any) => errorMessage.value = error.message ?? error

	return { error: errorMessage, setError }
}
