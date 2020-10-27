import { Auth } from '@app/usecases/store/modules/auth'
import { Modals } from '@app/usecases/store/modules/modals'

export const useStore = () => {
	return {
		auth: Auth,
		modals: Modals
	}
}
