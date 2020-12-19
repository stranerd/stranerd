import { BaseEntity } from '@modules/core/domains/entities/base'
import { ChallengeClone } from './challenge'

export class PersonalChallengeEntity extends BaseEntity {
	public readonly id: string
	public readonly progress: number
	public readonly clone: ChallengeClone
	public readonly createdAt: number

	constructor ({ id, progress, clone, createdAt }: ChallengeConstructorArgs) {
		super()
		this.id = id
		this.progress = progress
		this.clone = clone
		this.createdAt = createdAt
	}

	get endedAt () {
		return this.createdAt + (60 * 1000 * this.clone.time ?? 1)
	}
}

type ChallengeConstructorArgs = {
	id: string
	progress: number
	clone: ChallengeClone
	createdAt: number
}
