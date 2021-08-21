import { BaseEntity } from '@modules/core'

export class TagEntity extends BaseEntity {
	public readonly id: string
	public readonly count: number

	constructor ({ id, count }: TagConstructorArgs) {
		super()
		this.id = id
		this.count = count
	}

	get name () {
		return this.id
	}
}

type TagConstructorArgs = { id: string, count: number }
