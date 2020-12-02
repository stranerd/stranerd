import { BaseEntity } from '@modules/core/domains/entities/base'
import { Media } from '@modules/core/data/models/base'
export const DEFAULT_IMAGE_URL = '/images/user_profile.png'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly roles: UserRoles
	public readonly userBio: UserBio
	public readonly account: UserAccount
	public readonly rankings: UserRankings
	public readonly signedUpAt: Date
	public readonly hasSetProfile: boolean

	constructor ({ id, bio, roles, account, rankings, dates }: UserConstructorArgs) {
		super()
		this.id = id
		this.hasSetProfile = !!bio?.name
		this.userBio = generateDefaultBio(bio)
		this.roles = roles
		this.account = account
		this.rankings = {
			daily: rankings?.daily ?? 0,
			weekly: rankings?.weekly ?? 0,
			monthly: rankings?.monthly ?? 0,
			quarterly: rankings?.quarterly ?? 0
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
	dates: { signedUpAt: Date }
}

export interface UserBio {
	name: string
	email: string
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
export const generateDefaultBio = ({ name, email, image }: UserBio) :UserBio => {
	name = name || 'Anonymous'
	image = image || { name: 'user_profile.png', link: DEFAULT_IMAGE_URL, type: 'image/png', path: DEFAULT_IMAGE_URL }
	return { name, email, image }
}
