import { SubjectFactory } from '../factories/subject'

export class GetSubjectFactoryUseCase {
	call (): SubjectFactory {
		return new SubjectFactory()
	}
}
