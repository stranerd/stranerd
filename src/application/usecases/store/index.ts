import { Auth } from '@app/usecases/store/modules/auth'
import { Subjects } from '@app/usecases/store/modules/courses/subjects'

export const useStore = () => {
	return {
		auth: Auth,
		courses: {
			subjects: Subjects
		}
	}
}
