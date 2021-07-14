import { FirestoreService, FirestoreGetClauses } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'
import { TransactionBaseDataSource } from './transaction-base'

export class TransactionFirebaseDataSource implements TransactionBaseDataSource {
	async get (userId: string, conditions?: FirestoreGetClauses) {
		return await FirestoreService.get<TransactionFromModel>(`users/${userId}/transactions`, conditions)
	}
}
