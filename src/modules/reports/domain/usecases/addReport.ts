import { IReportRepository } from '../irepositories/ireport'
import { ReportFactory } from '../factories/report'

export class AddReportUseCase<ReportedType extends { userId: string }> {
	private repository: IReportRepository<ReportedType>

	constructor (repository: IReportRepository<ReportedType>) {
		this.repository = repository
	}

	async call (factory: ReportFactory<ReportedType>): Promise<string> {
		return await this.repository.add(await factory.toModel())
	}
}
