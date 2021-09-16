import { FirestoreGetClauses, FirestoreService, Listeners } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'
import { TransactionBaseDataSource } from './transaction-base'

export class TransactionFirebaseDataSource implements TransactionBaseDataSource {
	// @ts-ignore
	async get (userId: string, conditions?: FirestoreGetClauses) {
		// @ts-ignore
		return await FirestoreService.get<TransactionFromModel>(`users/${userId}/transactions`, conditions)
	}

	async listenToOne (userId: string, id: string, listener: Listeners<TransactionFromModel>) {
		// @ts-ignore
		return await FirestoreService.listenToMany<TransactionFromModel>(`users/${userId}/transactions/${id}`, listener)
	}

	async listenToMany (userId: string, listener: Listeners<TransactionFromModel>) {
		// @ts-ignore
		return await FirestoreService.listenToMany<TransactionFromModel>(`users/${userId}/transactions`, listener)
	}
}
