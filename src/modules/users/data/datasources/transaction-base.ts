import { FirestoreGetClauses } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'

export abstract class TransactionBaseDataSource {
	abstract get: (userId: string, conditions?: FirestoreGetClauses) => Promise<TransactionFromModel[]>
}
