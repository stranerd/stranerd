import { SessionSignout } from '@modules/auth'
import { GenerateLink } from '@utils/router'
import { useErrorHandler, useLoadingHandler } from '@app/usecases/core/states'

export const useSessionSignout = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		setError('')
		setLoading(true)
		try {
			await SessionSignout.call()
			window.location.assign(GenerateLink({ path: '/auth/signin', differentSubdomain: true }))
		} catch (error) { setError(error) }
		setLoading(false)
	}

	return { loading, error, signout }
}
