import { IUserReportRepository } from '../../irepositories/iuser-report'
import { UserReportFactory } from '../../factories/user-report'

export class AddUserReportUseCase {
	private repository: IUserReportRepository

	constructor (repository: IUserReportRepository) {
		this.repository = repository
	}

	async call (factory: UserReportFactory) : Promise<string> {
		return await this.repository.add(await factory.toModel())
	}
}
