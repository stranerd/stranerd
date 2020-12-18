import { BaseEntity } from '@modules/core/domains/entities/base'
import { Media } from '@modules/core/data/models/base'
export const DEFAULT_IMAGE_URL = '/images/user_profile.png'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly roles: UserRoles
	public readonly userBio: UserBio
	public readonly account: UserAccount
	public readonly rankings: Required<UserRankings>
	public readonly meta: UserMeta
	public readonly signedUpAt: string

	constructor ({ id, bio, roles, account, rankings, meta, dates }: UserConstructorArgs) {
		super()
		this.id = id
		this.userBio = generateDefaultBio(bio)
		this.roles = roles
		this.account = account
		this.rankings = {
			daily: rankings?.daily ?? 0,
			weekly: rankings?.weekly ?? 0,
			monthly: rankings?.monthly ?? 0,
			quarterly: rankings?.quarterly ?? 0
		}
		this.meta = {
			answerCount: meta?.answerCount ?? 0,
			questionCount: meta?.questionCount ?? 0,
			currentChallenge: meta?.currentChallenge
		}
		this.signedUpAt = dates.signedUpAt
	}

	get name () { return this.userBio.name }
	get email () { return this.userBio.email }
	get image () { return this.userBio.image?.link }
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings?: UserRankings
	meta?: UserMeta
	dates: { signedUpAt: string }
}

export interface UserBio {
	name: string
	email: string
	description: string
	image: Media
}
export interface UserRoles {
	isStudent: boolean
	isTutor?: boolean
	isAdmin?: boolean
}
export interface UserAccount {
	braintreeId: string
	credits: number
}
export interface UserRankings {
	daily?: number
	weekly?: number
	monthly?: number
	quarterly?: number
}
export interface UserMeta {
	answerCount?: number
	questionCount?: number
	currentChallenge?: string
}
export const generateDefaultBio = (bio: UserBio) :UserBio => {
	const name = bio?.name ?? 'Anonymous'
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const image = bio?.image ?? { name: 'user_profile.png', link: DEFAULT_IMAGE_URL, type: 'image/png', path: DEFAULT_IMAGE_URL }
	return { name, email, description, image }
}
