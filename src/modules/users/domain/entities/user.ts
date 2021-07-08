import { BaseEntity } from '@modules/core/domains/entities/base'
import { capitalize, catchDivideByZero } from '@utils/commons'
import { Avatars } from './avatar'
import { getScore, Ranks, getMyRank, getRankProgress } from './rank'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly roles: Required<UserRoles>
	public readonly bio: Required<UserBio>
	public readonly account: Omit<UserAccount, 'meta'> & { meta: Record<keyof UserAccount['meta'], string[]> }
	public readonly status: Required<UserStatus>
	public readonly tutor: Omit<Required<UserTutor>, 'tags'> & { tags: { id: string, count: number }[] }
	public readonly session: Omit<Omit<Required<UserSession>, 'lobby'>, 'requests'> & { requests: string[], lobby: string[] }
	public readonly dates: UserDates

	constructor ({ id, bio, roles, account, status, tutor, session, dates }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = generateDefaultBio(bio)
		this.roles = {
			isAdmin: roles?.isAdmin ?? false
		}
		this.account = {
			rank: account?.rank ?? Ranks.Rookie.level,
			coins: {
				bronze: account?.coins?.bronze ?? 0,
				gold: account?.coins?.gold ?? 0
			},
			bought: {
				bronze: account?.bought?.bronze ?? 0,
				gold: account?.bought?.gold ?? 0
			},
			meta: {
				answers: Object.keys(account?.meta?.answers ?? {}),
				bestAnswers: Object.keys(account?.meta?.bestAnswers ?? {}),
				ratedAnswers: Object.keys(account?.meta?.ratedAnswers ?? {}),
				questions: Object.keys(account?.meta?.questions ?? {}),
				solvedQuestions: Object.keys(account?.meta?.solvedQuestions ?? {}),
				answeredQuestions: Object.keys(account?.meta?.answeredQuestions ?? {}),
				questionComments: Object.keys(account?.meta?.questionComments ?? {}),
				answerComments: Object.keys(account?.meta?.answerComments ?? {}),
				sessions: Object.keys(account?.meta?.sessions ?? {}),
				completedSessions: Object.keys(account?.meta?.completedSessions ?? {}),
				tutorSessions: Object.keys(account?.meta?.tutorSessions ?? {})
			},
			streak: {
				count: account?.streak?.count ?? 0,
				longestStreak: account?.streak?.longestStreak ?? 0,
				lastSeen: account?.streak?.lastSeen ?? 0
			},
			ratings: {
				total: account?.ratings?.total ?? 0,
				count: account?.ratings?.count ?? 0
			}
		}
		this.status = {
			connections: status?.connections ?? {},
			lastSeen: status?.lastSeen ?? 0
		}
		this.tutor = {
			subject: tutor?.subject ?? undefined,
			tags: Object.entries(tutor?.tags ?? {})
				.map(([key, val]) => ({ id: key, name: key, count: val }))
				.sort((a, b) => a.count >= b.count ? -1 : 1)
		}
		this.session = {
			currentSession: session?.currentSession ?? null,
			currentTutorSession: session?.currentTutorSession ?? null,
			requests: Object.keys(session?.requests ?? {}),
			lobby: Object.keys(session?.lobby ?? {})
		}
		this.dates = {
			signedUpAt: dates?.signedUpAt ?? 0,
			deletedAt: dates?.deletedAt ?? undefined
		}
	}

	get firstName () { return this.bio.name.first }
	get lastName () { return this.bio.name.last }
	get fullName () { return this.bio.name.fullName! }
	get email () { return this.bio.email }
	get avatar () { return this.bio.avatar! }

	get isOnline () { return Object.keys(this.status.connections).length > 0 }
	get lastSeen () { return this.isOnline ? Date.now() : this.status.lastSeen }

	get averageRating () { return catchDivideByZero(this.account.ratings.total, this.ratingCount) }
	get ratingCount () { return this.account.ratings.count }
	get orderRating () { return Math.pow(this.account.ratings.total, this.averageRating) }
	get currentSession () { return this.session.currentSession || this.session.currentTutorSession || null }
	get subject () { return this.tutor.subject ?? null }
	get score () { return getScore(this) }
	get rank () { return getMyRank(this.account.rank) }
	get rankProgress () { return getRankProgress(this) }

	get canHostSessions () { return true } // this.rank.level >= Ranks.Scholar.level }
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	tutor: UserTutor
	session: UserSession
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
	isNew?: boolean | null
}
export interface UserRoles {
	isAdmin?: boolean
}
export interface UserAccount {
	rank: number
	coins: {
		bronze: number
		gold: number
	},
	bought: {
		bronze: number
		gold: number
	},
	meta: {
		answers?: Record<string, boolean>
		bestAnswers?: Record<string, boolean>
		ratedAnswers?: Record<string, number>
		answeredQuestions?: Record<string, boolean>
		questions?: Record<string, boolean>
		solvedQuestions?: Record<string, boolean>
		questionComments?: Record<string, boolean>
		answerComments?: Record<string, boolean>
		sessions?: Record<string, boolean>
		completedSessions?: Record<string, boolean>
		tutorSessions?: Record<string, boolean>
	}
	streak: {
		count: number,
		longestStreak: number,
		lastSeen: number
	}
	ratings: {
		total: number
		count: number
	}
}
export interface UserStatus {
	connections: Record<string, boolean>
	lastSeen: number
}

export interface UserSession {
	currentSession?: string | null
	currentTutorSession?: string | null
	requests?: Record<string, boolean>
	lobby?: Record<string, boolean>
}
export interface UserDates {
	signedUpAt: number
	deletedAt?: number
}
export interface UserTutor {
	subject: {
		id: string
		level: number
		upgrades: Record<number, {
			score: number
			takenAt: number
			passed: boolean
		}>
	} | undefined
	tags: Record<string, number> | undefined
}

export const generateDefaultBio = (bio: Partial<UserBio>) :Required<UserBio> => {
	const first = capitalize(bio?.name?.first ?? 'Anon')
	const last = capitalize(bio?.name?.last ?? 'Ymous')
	const fullName = first + ' ' + last
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const avatar = Avatars[bio?.avatar!] ? bio?.avatar! : Avatars.default.id
	const isNew = !!bio.isNew ?? false
	return { name: { first, last, fullName }, email, description, avatar, isNew }
}
