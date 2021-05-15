import { IUserRepository } from '../../irepositories/iuser'

export class AddTutorSubjectUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (id: string, subject: string) {
		return await this.repository.update(id, {
			// @ts-ignore
			'tutor/subject': { id: subject, level: 0, upgrades: {} }
		})
	}
}
