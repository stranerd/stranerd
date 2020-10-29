import { Media } from '@modules/core/data/models/base'
const DEFAULT_IMAGE_URL = '/images/user_profile.png'

export class UserEntity {
	public readonly id: string
	public readonly roles: UserRoles
	public readonly userBio: UserBio
	public readonly signedUpAt: Date

	constructor ({ id, bio, roles, dates }: UserConstructorArgs) {
		this.id = id
		this.userBio = bio
		this.roles = roles
		this.signedUpAt = dates.signedUpAt
	}

	get name () { return this.userBio.name }
	get email () { return this.userBio.email }
	get bio () { return this.userBio.bio }
	get image () { return this.userBio.image?.link || DEFAULT_IMAGE_URL }
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: { signedUpAt: Date }
}

export interface UserBio {
	name: string
	email: string
	bio: string
	image: Media
}
export interface UserRoles {
	isStudent: boolean
	isTutor?: boolean
	isAdmin?: boolean
}
