import { BaseEntity } from '@modules/core'

export class TransactionEntity extends BaseEntity {
	public readonly id: string
	public readonly isGold: boolean
	public readonly event: string
	public readonly amount: number
	public readonly createdAt: number

	constructor ({ id, isGold, event, amount, createdAt }: TransactionConstructorArgs) {
		super()
		this.id = id
		this.isGold = isGold
		this.event = event
		this.amount = amount
		this.createdAt = createdAt
	}

	get isGain () { return this.amount >= 0 }
}

type TransactionConstructorArgs = {
	id: string, isGold: boolean, event: string, amount: number, createdAt: number
}
