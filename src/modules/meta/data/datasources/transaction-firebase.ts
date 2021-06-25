import { FirestoreService } from '@modules/core/services/firebase'
import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { TransactionFromModel } from '../models/transaction'
import { TransactionBaseDataSource } from './transaction-base'

export class TransactionFirebaseDataSource implements TransactionBaseDataSource {
	async get (userId: string, conditions?: FirestoreGetClauses) {
		return await FirestoreService.get(`users/${userId}/transactions`, conditions) as TransactionFromModel[]
	}
}
