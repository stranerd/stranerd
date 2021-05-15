import { IUserRepository } from '../../irepositories/iuser'

export class RemoveTutorSubjectUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.update(id, {
			// @ts-ignore
			'tutor/subject': null
		})
	}
}
