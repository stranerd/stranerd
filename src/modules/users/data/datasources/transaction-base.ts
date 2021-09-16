import { QueryParams, QueryResults } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'

export abstract class TransactionBaseDataSource {
	abstract get: (userId: string, query: QueryParams) => Promise<QueryResults<TransactionFromModel>>
}
