import { BaseEntity } from '@modules/core/domains/entities/base'
import { Media } from '@modules/core/data/models/base'
export const DEFAULT_IMAGE_URL = '/images/user_profile.png'
export enum Status {
	OFFLINE = 0,
	ONLINE = 1
}
export enum RankingPeriods {
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly',
	quarterly = 'quarterly',
}

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly roles: UserRoles
	public readonly userBio: Required<UserBio>
	public readonly account: UserAccount
	public readonly rankings: Required<UserRankings>
	public readonly meta: Required<UserMeta>
	public readonly status: Required<UserStatus>
	public readonly tutor: Required<UserTutor> | undefined
	public readonly dates: UserDates

	constructor ({ id, bio, roles, account, rankings, meta, status, tutor, dates }: UserConstructorArgs) {
		super()
		this.id = id
		this.userBio = generateDefaultBio(bio)
		this.roles = roles ?? { isStudent: true }
		this.account = account ?? { coins: 0 }
		this.rankings = Object.fromEntries(
			Object.keys(RankingPeriods)
				.map((key) => [key, rankings?.[key as RankingPeriods] ?? 0])
		) as Required<UserRankings>
		this.meta = {
			answerCount: meta?.answerCount ?? 0,
			questionCount: meta?.questionCount ?? 0,
			questionCommentCount: meta?.questionCommentCount ?? 0,
			answerCommentCount: meta?.answerCommentCount ?? 0,
			currentChallenge: meta?.currentChallenge ?? null,
			currentSession: meta?.currentSession ?? null
		}
		this.status = {
			mode: status?.mode ?? Status.OFFLINE,
			updatedAt: status?.updatedAt ?? 0
		}
		this.tutor = {
			canTeach: tutor?.canTeach ?? false,
			rating: tutor?.rating ?? 0,
			reviews: tutor?.reviews ?? 0,
			subjects: tutor?.subjects ?? {},
			currentSession: tutor?.currentSession ?? null
		}
		this.dates = dates
	}

	get firstName () { return this.userBio.name.first }
	get lastName () { return this.userBio.name.last }
	get fullName () { return this.userBio.name.first + ' ' + this.userBio.name.last }
	get email () { return this.userBio.email }
	get image () { return this.userBio.image.link }

	get isOnline () { return this.status.mode === Status.ONLINE }
	get lastSeen () { return this.isOnline ? Date.now() : this.status.updatedAt }

	get subjects () {
		return Object.entries(this.tutor?.subjects ?? {})
			.map((c) => ({ ...c[1], id: c[0] }))
	}
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings?: UserRankings
	meta?: UserMeta
	status?: UserStatus
	tutor?: UserTutor
	dates: UserDates
}

export interface UserBio {
	name: {
		first: string
		last: string
		fullName?: string
	}
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
	coins: number
}
export interface UserRankings extends Record<RankingPeriods, number> {}
export interface UserMeta {
	answerCount?: number
	questionCount?: number
	questionCommentCount?: number
	answerCommentCount?: number
	currentChallenge?: string | null
	currentSession?: string | null
}
export interface UserStatus {
	mode: Status
	updatedAt: number
}
export interface UserDates {
	signedUpAt: number
}
export interface UserTutor {
	canTeach: boolean
	rating: number
	reviews: number
	subjects: Record<string, {
		level: number
		upgrades: Record<number, {
			score: number
			takenAt: number
			passed: boolean
		}>
	}>
	currentSession?: string | null
}

export const generateDefaultBio = (bio: UserBio) :UserBio => {
	const first = bio?.name?.first ?? 'Anon'
	const last = bio?.name?.last ?? 'Ymous'
	const fullName = first + ' ' + last
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const image = bio?.image ?? { name: 'user_profile.png', link: DEFAULT_IMAGE_URL, type: 'image/png', path: DEFAULT_IMAGE_URL }
	return { name: { first, last, fullName }, email, description, image }
}
