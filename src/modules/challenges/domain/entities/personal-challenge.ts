import { BaseEntity } from '@modules/core/domains/entities/base'
import { ChallengeClone } from './challenge'

export class PersonalChallengeEntity extends BaseEntity {
	public readonly id: string
	public readonly progress: number
	public readonly cancelled: boolean
	public readonly clone: ChallengeClone
	public readonly createdAt: number

	constructor ({ id, progress, clone, cancelled, createdAt }: ChallengeConstructorArgs) {
		super()
		this.id = id
		this.progress = progress
		this.cancelled = cancelled
		this.clone = clone
		this.createdAt = createdAt
	}

	get endedAt () {
		return this.createdAt + (60 * 60 * 1000 * this.clone.time ?? 1)
	}

	get isCompleted () { return this.progress === this.clone.count }
}

type ChallengeConstructorArgs = {
	id: string
	progress: number
	cancelled: boolean
	clone: ChallengeClone
	createdAt: number
}
