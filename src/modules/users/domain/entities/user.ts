import { BaseEntity } from '@modules/core/domains/entities/base'
import { Avatars } from '@modules/users/domain/entities/avatar'
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
	public readonly userBio: UserBio
	public readonly account: UserAccount
	public readonly rankings: Required<UserRankings>
	public readonly meta: Required<UserMeta>
	public readonly chats: { id: string, bio: UserBio }[]
	public readonly status: Required<UserStatus>
	public readonly tutor: Required<UserTutor> | undefined
	public readonly dates: UserDates

	constructor ({ id, bio, roles, account, rankings, meta, chats, status, tutor, dates }: UserConstructorArgs) {
		super()
		this.id = id
		this.userBio = generateDefaultBio(bio)
		this.roles = {
			isStudent: roles?.isStudent ?? true,
			isTutor: roles?.isTutor ?? false,
			isAdmin: roles?.isAdmin ?? false
		}
		this.account = {
			coins: {
				bronze: account?.coins?.bronze ?? 0,
				gold: account?.coins?.gold ?? 0
			}
		}
		this.rankings = Object.fromEntries(
			Object.keys(RankingPeriods).map((key) => [key, rankings?.[key as RankingPeriods] ?? 0])
		) as Required<UserRankings>
		this.meta = {
			answers: meta?.answers ?? {},
			bestAnswers: meta?.bestAnswers ?? {},
			questions: meta?.questions ?? {},
			answeredQuestions: meta?.answeredQuestions ?? {},
			questionComments: meta?.questionComments ?? {},
			answerComments: meta?.answerComments ?? {},
			sessions: meta?.sessions ?? {},
			tutorSessions: meta?.tutorSessions ?? {},
			currentSession: meta?.currentSession ?? null
		}
		this.chats = Object.entries(chats ?? {})
			.map(([id, bio]) => ({ id, bio: generateDefaultBio(bio) }))
		this.status = {
			streak: status?.streak ?? 0,
			mode: status?.mode ?? Status.OFFLINE,
			updatedAt: status?.updatedAt ?? 0
		}
		this.tutor = {
			ratings: tutor?.ratings ?? { total: 0, count: 0 },
			subjects: tutor?.subjects ?? {},
			currentSession: tutor?.currentSession ?? null,
			sessionCount: tutor?.sessionCount ?? 0
		}
		this.dates = dates
	}

	get firstName () { return this.userBio.name.first }
	get lastName () { return this.userBio.name.last }
	get fullName () { return this.userBio.name.first + ' ' + this.userBio.name.last }
	get email () { return this.userBio.email }
	get avatar () { return Avatars[this.userBio.avatar!]?.link ?? Avatars.default.link }

	get isOnline () { return this.status.mode === Status.ONLINE }
	get lastSeen () { return this.isOnline ? Date.now() : this.status.updatedAt }

	get averageRating () { return this.tutor?.ratings.count === 0 ? 0 : (this.tutor?.ratings.total ?? 0) / (this.tutor?.ratings.count ?? 1) }
	get ratingCount () { return this.tutor?.ratings.count ?? 0 }
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
	chats?: UserChats
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
	avatar: keyof typeof Avatars | null
}
export interface UserRoles {
	isStudent: boolean
	isTutor?: boolean
	isAdmin?: boolean
}
export interface UserAccount {
	coins: {
		bronze: number
		gold: number
	}
}
export interface UserRankings extends Record<RankingPeriods, number> {}
export interface UserMeta {
	answers?: Record<string, boolean>
	bestAnswers?: Record<string, boolean>
	answeredQuestions?: Record<string, number>
	questions?: Record<string, boolean>
	questionComments?: Record<string, boolean>
	answerComments?: Record<string, boolean>
	sessions?: Record<string, boolean>
	tutorSessions?: Record<string, boolean>
	currentSession?: string | null
}
export interface UserChats extends Record<string, UserBio> {}
export interface UserStatus {
	mode: Status
	updatedAt: number
	streak: number
}
export interface UserDates {
	signedUpAt: number
}
export interface UserTutor {
	ratings: {
		total: number
		count: number
	}
	subjects: Record<string, {
		level: number
		upgrades: Record<number, {
			score: number
			takenAt: number
			passed: boolean
		}>
	}>
	currentSession?: string | null
	sessionCount?: number
}

export const generateDefaultBio = (bio: Partial<UserBio>) :UserBio => {
	const first = bio?.name?.first ?? 'Anon'
	const last = bio?.name?.last ?? 'Ymous'
	const fullName = first + ' ' + last
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const avatar = Avatars[bio?.avatar!] ? bio?.avatar! : null
	return { name: { first, last, fullName }, email, description, avatar }
}
