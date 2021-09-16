import { QueryParams } from '@modules/core'
import { ITransactionRepository } from '../../domain/irepositories/itransaction'
import { TransactionBaseDataSource } from '../datasources/transaction-base'
import { TransactionTransformer } from '../transformers/transaction'

export class TransactionRepository implements ITransactionRepository {
	private readonly dataSource: TransactionBaseDataSource
	private readonly transformer: TransactionTransformer

	constructor (dataSource: TransactionBaseDataSource, transformer: TransactionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (userId: string, query: QueryParams) {
		const models = await this.dataSource.get(userId, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}
}
