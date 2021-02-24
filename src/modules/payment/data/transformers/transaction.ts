import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { TransactionFromModel } from '../models/transaction'
import { TransactionEntity } from '../../domain/entities/transaction'

export class TransactionTransformer {
	fromJSON (model: TransactionFromModel) {
		const { id, isGold, event, amount, dates: { createdAt } } = model
		return new TransactionEntity({
			id, event, amount, isGold,
			createdAt: timestampToMs(createdAt)
		})
	}
}
