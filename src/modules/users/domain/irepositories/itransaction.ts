import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TransactionEntity } from '../entities/transaction'

export interface ITransactionRepository {
	get: (userId: string, query: QueryParams) => Promise<QueryResults<TransactionEntity>>
	listenToOne: (userId: string, id: string, listener: Listeners<TransactionEntity>) => Promise<() => void>
	listenToMany: (userId: string, listener: Listeners<TransactionEntity>) => Promise<() => void>
}
