import { ITutorApplicationRepository } from '../../irepositories/itutorApplication'
import { TutorApplicationFactory } from '../../factories/tutorApplication'

export class AddTutorApplicationsUseCase {
    private repository: ITutorApplicationRepository

    constructor (repository: ITutorApplicationRepository) {
	    this.repository = repository
    }

    async call (factory: TutorApplicationFactory) {
	    return await this.repository.add(await factory.toModel())
    }
}
