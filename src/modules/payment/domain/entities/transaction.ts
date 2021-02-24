export class TransactionEntity {
	public readonly id: string
	public readonly isGold: boolean
	public readonly event: string
	public readonly amount: number
	public readonly createdAt: number

	constructor ({ id, isGold, event, amount, createdAt }: TransactionConstructorArgs) {
		this.id = id
		this.isGold = isGold
		this.event = event
		this.amount = amount
		this.createdAt = createdAt
	}
}

type TransactionConstructorArgs = {
	id: string, isGold: boolean, event: string, amount: number, createdAt: number
}
