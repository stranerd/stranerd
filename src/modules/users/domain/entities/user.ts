import { BaseEntity } from '@modules/core/domains/entities/base'
import { capitalize, catchDivideByZero } from '@utils/commons'
import { Avatars } from './avatar'
import { getScore, getMyRank, getRankProgress, getScholarLevel } from './rank'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly account: UserAccount
	public readonly status: UserStatus
	public readonly tutor: UserTutor
	public readonly session: UserSession
	public readonly dates: UserDates

	constructor ({ id, bio, roles, account, status, tutor, session, dates }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = generateDefaultBio(bio ?? {})
		this.roles = {
			isAdmin: roles?.isAdmin ?? false
		}
		this.account = {
			rank: account?.rank ?? null,
			coins: {
				bronze: account?.coins?.bronze ?? 0,
				gold: account?.coins?.gold ?? 0
			},
			bought: {
				bronze: account?.bought?.bronze ?? 0,
				gold: account?.bought?.gold ?? 0
			},
			meta: {
				answers: account?.meta?.answers ?? {},
				bestAnswers: account?.meta?.bestAnswers ?? {},
				ratedAnswers: account?.meta?.ratedAnswers ?? {},
				questions: account?.meta?.questions ?? {},
				solvedQuestions: account?.meta?.solvedQuestions ?? {},
				answeredQuestions: account?.meta?.answeredQuestions ?? {},
				questionComments: account?.meta?.questionComments ?? {},
				answerComments: account?.meta?.answerComments ?? {},
				sessions: account?.meta?.sessions ?? {},
				completedSessions: account?.meta?.completedSessions ?? {},
				tutorSessions: account?.meta?.tutorSessions ?? {}
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
			subjects: tutor?.subjects ?? {},
			tags: tutor?.tags ?? {}
		}
		this.session = {
			currentSession: session?.currentSession ?? null,
			currentTutorSession: session?.currentTutorSession ?? null,
			requests: session?.requests ?? {},
			lobby: session?.lobby ?? {}
		}
		this.dates = {
			signedUpAt: dates?.signedUpAt ?? 0,
			deletedAt: dates?.deletedAt ?? null
		}
	}

	get firstName () { return this.bio.name.first }
	get lastName () { return this.bio.name.last }
	get fullName () { return this.bio.name.fullName! }
	get email () { return this.bio.email }
	get avatar () { return this.bio.avatar! }
	get description () { return this.bio.description }

	get isOnline () { return Object.keys(this.status.connections).length > 0 }
	get lastSeen () { return this.isOnline ? Date.now() : this.status.lastSeen }

	get averageRating () { return catchDivideByZero(this.account.ratings.total, this.ratingCount) }
	get ratingCount () { return this.account.ratings.count }
	get orderRating () { return Math.pow(this.account.ratings.total, this.averageRating) }
	get strongestSubject () { return this.subjects[0] }
	get weakerSubjects () { return this.subjects.slice(1) }
	get subjects () {
		return Object.entries(this.tutor.subjects)
			.map(([key, val]) => ({ id: key, count: val }))
			.sort((a, b) => a.count >= b.count ? -1 : 1)
	}

	get tags () {
		return Object.entries(this.tutor.tags)
			.map(([key, val]) => ({ id: key, count: val }))
			.sort((a, b) => a.count >= b.count ? -1 : 1)
	}

	get score () { return getScore(this) }
	get rank () { return getMyRank(this) }
	get rankProgress () { return getRankProgress(this) }

	get currentSession () { return this.session.currentSession || this.session.currentTutorSession || null }
	get canHostSessions () { return !this.currentSession && this.rank.level >= getScholarLevel() }
	get canRequestSessions () { return !this.currentSession && Object.keys(this.session.requests).length === 0 } // this.rank.level >= Ranks.Scholar.level }

	get meta () {
		return Object.fromEntries(
			Object.entries(this.account.meta)
				.map(([key, val]) => [key, Object.keys(val)])
		) as Record<keyof UserAccount['meta'], string[]>
	}
}

type UserConstructorArgs = {
	id: string
	bio: DeepNullable<UserBio>
	roles: DeepNullable<UserRoles>
	account: DeepNullable<UserAccount>
	status: DeepNullable<UserStatus>
	tutor: DeepNullable<UserTutor>
	session: DeepNullable<UserSession>
	dates: DeepNullable<UserDates>
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
	isAdmin: boolean
}
export interface UserAccount {
	rank: number | null
	coins: {
		bronze: number
		gold: number
	},
	bought: {
		bronze: number
		gold: number
	},
	meta: {
		answers: Record<string, boolean>
		bestAnswers: Record<string, boolean>
		ratedAnswers: Record<string, number>
		answeredQuestions: Record<string, boolean>
		questions: Record<string, boolean>
		solvedQuestions: Record<string, boolean>
		questionComments: Record<string, boolean>
		answerComments: Record<string, boolean>
		sessions: Record<string, boolean>
		completedSessions: Record<string, boolean>
		tutorSessions: Record<string, boolean>
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
	currentSession: string | null
	currentTutorSession: string | null
	requests: Record<string, boolean>
	lobby: Record<string, boolean>
}
export interface UserDates {
	signedUpAt: number
	deletedAt: number | null
}
export interface UserTutor {
	subjects: Record<string, number>
	tags: Record<string, number>
}

export const generateDefaultBio = (bio: Partial<UserBio>) :DeepRequired<UserBio> => {
	const first = capitalize(bio?.name?.first ?? 'Anon')
	const last = capitalize(bio?.name?.last ?? 'Ymous')
	const fullName = first + ' ' + last
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const avatar = Avatars[bio?.avatar!] ? bio?.avatar! : Avatars.default.id
	const isNew = !!bio?.isNew ?? false
	return { name: { first, last, fullName }, email, description, avatar, isNew }
}
