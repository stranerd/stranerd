import { Timestamp } from '@modules/core/data/models/base'

export interface TransactionFromModel {
	id: string
	amount: number
	event: string
	dates: { createdAt: Timestamp }
}
