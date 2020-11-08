import { QuestionFactory } from '../../factories/question'

export class GetQuestionFactoryUseCase {
	call (): QuestionFactory {
		return new QuestionFactory()
	}
}
