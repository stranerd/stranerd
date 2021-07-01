import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
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

	async get (userId: string, conditions?: FirestoreGetClauses) {
		const models = await this.dataSource.get(userId, conditions)
		return models.map(this.transformer.fromJSON)
	}
}
