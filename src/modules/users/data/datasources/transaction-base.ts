import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'

export interface TransactionBaseDataSource {
	get: (userId: string, query: QueryParams) => Promise<QueryResults<TransactionFromModel>>
	listenToMany: (user: string, listener: Listeners<TransactionFromModel>) => Promise<() => void>
	listenToOne: (user: string, id: string, listener: Listeners<TransactionFromModel>) => Promise<() => void>
}
