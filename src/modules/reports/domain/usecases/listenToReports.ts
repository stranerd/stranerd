import { Listeners } from '@modules/core'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity, ReportType, Type } from '../entities/report'

export class ListenToReportsUseCase<T extends Type> {
	private repository: IReportRepository
	private readonly type: ReportType

	constructor (type: ReportType, repository: IReportRepository) {
		this.repository = repository
		this.type = type
	}

	async call (listener: Listeners<ReportEntity<T>>) {
		return await this.repository.listenToMany({
			created: async (entity) => {
				if (entity.type === this.type) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.type === this.type) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.type === this.type) await listener.deleted(entity)
			}
		})
	}
}
