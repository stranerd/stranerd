import { QueryParams, QueryResults } from '@modules/core'
import { TransactionEntity } from '../entities/transaction'

export abstract class ITransactionRepository {
	abstract get: (userId: string, query: QueryParams) => Promise<QueryResults<TransactionEntity>>
}
