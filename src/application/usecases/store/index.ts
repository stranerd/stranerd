import { Auth } from '@app/usecases/store/modules/auth'
import { Modals } from '@app/usecases/store/modules/modals'
import { Subjects } from '@app/usecases/store/modules/courses/subjects'

export const useStore = () => {
	return {
		auth: Auth,
		modals: Modals,
		courses: {
			subjects: Subjects
		}
	}
}
