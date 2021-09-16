import { QueryParams } from '@modules/core'
import { IReportRepository } from '../../domain/irepositories/ireport'
import { ReportBaseDataSource } from '../datasources/report-base'
import { ReportTransformer } from '../transformers/report'
import { ReportFromModel, ReportToModel } from '../models/report'

export class ReportRepository implements IReportRepository {
	private dataSource: ReportBaseDataSource
	private transformer: ReportTransformer

	constructor (dataSource: ReportBaseDataSource, transformer: ReportTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: ReportToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return models.map((model: ReportFromModel) => this.transformer.fromJSON(model))
	}

	async update (id: string, data: ReportToModel) {
		return await this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
