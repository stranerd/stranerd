import { DatabaseGetClauses } from '@modules/core'
import { IUserReportRepository } from '../../domain/irepositories/iuser-report'
import { ReportBaseDataSource } from '../datasources/report-base'
import { UserReportTransformer } from '../transformers/user-report'
import { UserReportFromModel, UserReportToModel } from '../models/user-report'

export class UserReportRepository implements IUserReportRepository {
	private dataSource: ReportBaseDataSource<UserReportFromModel, UserReportToModel>
	private transformer: UserReportTransformer

	constructor (dataSource: ReportBaseDataSource<UserReportFromModel, UserReportToModel>, transformer: UserReportTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: UserReportToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return undefined
	}

	async get (conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: UserReportFromModel) => this.transformer.fromJSON(model))
	}

	async update (id: string, data: UserReportToModel) {
		return await this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
