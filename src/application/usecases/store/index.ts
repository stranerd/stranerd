import { Auth } from '@app/usecases/store/modules/auth'

export const useStore = () => {
	return {
		auth: Auth
	}
}
