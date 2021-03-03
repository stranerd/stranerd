import { getMonth } from '@utils/dates'
import { BaseEntity } from '@modules/core/domains/entities/base'

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
	get date () {
		const date = new Date(this.createdAt)
		const day = date.getDate()
		const month = getMonth(date.getMonth())
		const year = date.getFullYear()
		return `${day}-${month}-${year}`
	}

	get time () {
		const date = new Date(this.createdAt)
		const hours = date.getHours()
		const minutes = date.getMinutes()
		return `${hours}:${minutes}`
	}
}

type TransactionConstructorArgs = {
	id: string, isGold: boolean, event: string, amount: number, createdAt: number
}
