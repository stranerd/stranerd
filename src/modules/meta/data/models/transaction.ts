import { Timestamp } from '@modules/core/data/models/base'

export interface TransactionFromModel {
	id: string
	isGold: boolean
	amount: number
	event: string
	dates: { createdAt: Timestamp }
}
