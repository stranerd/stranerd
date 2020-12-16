import { BaseEntity } from '@modules/core/domains/entities/base'

enum ChallengeTypes {
	answers = 'answers'
}

export class ChallengeEntity extends BaseEntity {
	public readonly id: string
	public readonly type: ChallengeTypes
	public readonly description: string
	public readonly reward: number
	public readonly time: number
	public readonly meta: Record<string, any>
	public readonly createdAt: string

	constructor ({ id, type, description, reward, time, meta, createdAt }: ChallengeConstructorArgs) {
		super()
		this.id = id
		this.type = type as ChallengeTypes
		this.description = description
		this.reward = reward
		this.time = time
		this.meta = meta
		this.createdAt = createdAt
	}

	get props () {
		if (this.type === ChallengeTypes.answers) return { subjectId: this.meta?.subjectId ?? '', quantity: this.meta?.quantity ?? 5 }
		return this.meta
	}
}

type ChallengeConstructorArgs = {
	id: string,
	type: string,
	description: string,
	reward: number,
	time: number,
	meta: Record<string, any>
	createdAt: string
}
