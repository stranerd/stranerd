import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { PAGINATION_LIMIT } from '@utils/constants'
import { ITutorApplicationRepository } from '../../irepositories/itutorApplication'

export class GetTutorApplicationsUseCase {
    private repository: ITutorApplicationRepository

    constructor (repository: ITutorApplicationRepository) {
	    this.repository = repository
    }

    async call (date?: number) {
	    const conditions: FirestoreGetClauses = {
		    order: { field: 'dates.createdAt', desc: true },
		    limit: PAGINATION_LIMIT + 1
	    }
	    if (date) conditions.where = [{ field: 'dates.createdAt', condition: '<', value: new Date(date) }]
	    return await this.repository.get(conditions)
    }
}
