export class TransactionEntity {
	public readonly id: string
	public readonly event: string
	public readonly amount: number
	public readonly createdAt: number

	constructor ({ id, event, amount, createdAt }: TransactionConstructorArgs) {
		this.id = id
		this.event = event
		this.amount = amount
		this.createdAt = createdAt
	}
}

type TransactionConstructorArgs = {
	id: string, event: string, amount: number, createdAt: number
}
