import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IReportRepository } from '../irepositories/ireport'
import { ReportType } from '../entities/report'

export class GetReportsUseCase {
	private repository: IReportRepository
	private readonly type: ReportType

	constructor (type: ReportType, repository: IReportRepository) {
		this.repository = repository
		this.type = type
	}

	async call (date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt' },
			limit: PAGINATION_LIMIT,
			where: [{ field: 'type', value: this.type }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })
		return await this.repository.get(conditions)
	}
}
