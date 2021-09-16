import { Listeners } from '@modules/core'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity } from '../entities/report'

export class ListenToReportUseCase<Type> {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		this.repository = repository
	}

	async call (id: string, listeners: Listeners<ReportEntity<Type>>) {
		return await this.repository.listenToOne(id, listeners)
	}
}
