import { Timestamp } from '@modules/core'

export interface TransactionFromModel {
	id: string
	isGold: boolean
	amount: number
	event: string
	dates: { createdAt: Timestamp }
}
