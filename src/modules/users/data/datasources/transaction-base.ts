import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'

export abstract class TransactionBaseDataSource {
	abstract get: (userId: string, query: QueryParams) => Promise<QueryResults<TransactionFromModel>>
	abstract listenToMany: (user: string, listener: Listeners<TransactionFromModel>) => Promise<() => void>
	abstract listenToOne: (user: string, id: string, listener: Listeners<TransactionFromModel>) => Promise<() => void>
}
