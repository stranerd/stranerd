import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToQuestionsUseCase {
    private repository: IQuestionRepository

    constructor (repository: IQuestionRepository) {
	    this.repository = repository
    }

    async call (callback: (entities: QuestionEntity[]) => void, date?: Date) :Promise<() => void > {
	    const conditions: FirestoreGetClauses = {
		    order: { field: 'dates.createdAt', desc: true }
	    }
	    if (date) conditions.where = [{ field: 'dates.createdAt', condition: '>', value: date }]

	    return await this.repository.listenToMany(callback, conditions)
    }
}
