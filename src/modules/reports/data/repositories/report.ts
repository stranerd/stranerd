import { DatabaseGetClauses } from '@modules/core'
import { IReportRepository } from '../../domain/irepositories/ireport'
import { ReportBaseDataSource } from '../datasources/report-base'
import { ReportTransformer } from '../transformers/report'
import { ReportFromModel, ReportToModel } from '../models/report'

export class ReportRepository<Key extends string, ReportType extends { userId: string }> implements IReportRepository<ReportType> {
	private dataSource: ReportBaseDataSource<Key, ReportType>
	private transformer: ReportTransformer<ReportType>

	constructor (dataSource: ReportBaseDataSource<Key, ReportType>, transformer: ReportTransformer<ReportType>) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: ReportToModel<ReportType>) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (conditions?: DatabaseGetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: ReportFromModel<ReportType>) => this.transformer.fromJSON(model))
	}

	async update (id: string, data: ReportToModel<ReportType>) {
		return await this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
