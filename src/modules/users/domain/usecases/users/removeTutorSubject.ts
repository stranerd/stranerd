import { IUserRepository } from '../../irepositories/iuser'

export class RemoveTutorSubjectUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (id: string, subject: string) {
		return await this.repository.update(id, {
			[`tutor/subjects/${subject}`]: null
		})
	}
}
