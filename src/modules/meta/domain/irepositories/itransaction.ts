import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TransactionEntity } from '../entities/transaction'

export abstract class ITransactionRepository {
	abstract get: (userId: string, conditions?: FirestoreGetClauses) => Promise<TransactionEntity[]>
}
