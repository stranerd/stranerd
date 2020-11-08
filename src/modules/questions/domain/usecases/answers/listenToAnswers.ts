import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class ListenToAnswersUseCase {
    private repository: IAnswerRepository

    constructor (repository: IAnswerRepository) {
	    this.repository = repository
    }

    async call (questionId: string, callback: (entities: AnswerEntity[]) => void) :Promise<() => void > {
	    const conditions: DatabaseGetClauses = {
		    order: {
			    field: 'questionId',
			    condition: { '=': questionId }
		    }
	    }

	    return await this.repository.listen(callback, conditions)
    }
}
