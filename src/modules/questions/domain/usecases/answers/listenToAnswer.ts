import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class ListenToAnswerUseCase {
    private repository: IAnswerRepository

    constructor (repository: IAnswerRepository) {
	    this.repository = repository
    }

    async call (id: string, callback: (entity: AnswerEntity | null) => void) {
	    return await this.repository.listenToOne(id, callback)
    }
}
