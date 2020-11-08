import { AnswerFactory } from '../../factories/answer'

export class GetAnswerFactoryUseCase {
	call (): AnswerFactory {
		return new AnswerFactory()
	}
}
