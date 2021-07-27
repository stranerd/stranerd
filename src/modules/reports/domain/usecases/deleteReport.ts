import { IReportRepository } from '../irepositories/ireport'

export class DeleteReportUseCase<ReportedType extends { userId: string }> {
	private repository: IReportRepository<ReportedType>

	constructor (repository: IReportRepository<ReportedType>) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
