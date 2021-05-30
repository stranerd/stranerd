import { ITutorApplicationRepository } from '../../irepositories/itutorApplication'

export class ApproveTutorApplicationUseCase {
    private repository: ITutorApplicationRepository

    constructor (repository: ITutorApplicationRepository) {
	    this.repository = repository
    }

    async call (id: string, approved: boolean) {
	    return await this.repository.approve(id, approved)
    }
}
