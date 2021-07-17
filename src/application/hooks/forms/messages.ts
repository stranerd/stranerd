import { reqRef } from '@nuxtjs/composition-api'
import { MessageFactory, AddMessage } from '@modules/forms'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'

export const useCreateMessage = () => {
	const factory = reqRef(new MessageFactory())
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const createMessage = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddMessage.call(factory.value)
				factory.value.reset()
				await setMessage('Message sent successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, message,
		createMessage
	}
}
