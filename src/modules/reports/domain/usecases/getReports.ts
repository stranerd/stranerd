import { DatabaseGetClauses } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IReportRepository } from '../irepositories/ireport'

export class GetReportsUseCase<ReportedType extends { userId: string }> {
	private repository: IReportRepository<ReportedType>

	constructor (repository: IReportRepository<ReportedType>) {
		this.repository = repository
	}

	async call (date?: number) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'dates/createdAt' },
			limit: { count: PAGINATION_LIMIT + 1, bottom: true }
		}
		if (date) conditions!.order!.condition = { '<': date }
		return await this.repository.get(conditions)
	}
}
