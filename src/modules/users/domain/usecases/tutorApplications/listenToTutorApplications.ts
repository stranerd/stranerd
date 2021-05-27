import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ITutorApplicationRepository } from '../../irepositories/itutorApplication'
import { TutorApplicationEntity } from '../../entities/tutorApplication'

export class ListenToTutorApplicationsUseCase {
    private repository: ITutorApplicationRepository

    constructor (repository: ITutorApplicationRepository) {
	    this.repository = repository
    }

    async call (callback: (entities: TutorApplicationEntity[]) => void, date?: number) {
	    const conditions: FirestoreGetClauses = {
		    order: { field: 'dates.createdAt', desc: false }
	    }
	    if (date) conditions.where = [{ field: 'dates.createdAt', condition: '>=', value: date }]

	    return await this.repository.listen(callback, conditions)
    }
}
