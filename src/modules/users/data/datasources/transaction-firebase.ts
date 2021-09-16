import { FirestoreGetClauses, FirestoreService } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'
import { TransactionBaseDataSource } from './transaction-base'

export class TransactionFirebaseDataSource implements TransactionBaseDataSource {
	// @ts-ignore
	async get (userId: string, conditions?: FirestoreGetClauses) {
		// @ts-ignore
		return await FirestoreService.get<TransactionFromModel>(`users/${userId}/transactions`, conditions)
	}
}
