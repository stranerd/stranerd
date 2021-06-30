import { BaseEntity } from '@modules/core/domains/entities/base'
import { Avatars } from '@modules/users/domain/entities/avatar'
import { Achievements, getUserAchievements } from '@modules/users/domain/entities/achievement'
import { capitalize } from '@utils/commons'
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
	public readonly account: Omit<UserAccount, 'meta'> & { meta: UserMeta }
	public readonly rankings: Required<UserRankings>
	public readonly status: Required<UserStatus>
	public readonly tutor: Required<UserTutor> | undefined
	public readonly achievements: Required<ReturnType<typeof getUserAchievements>>
	public readonly dates: UserDates

	constructor ({ id, bio, roles, account, rankings, status, tutor, achievements, dates }: UserConstructorArgs) {
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
			},
			xp: account?.xp ?? 0,
			meta: {
				answers: Object.keys(account?.meta?.answers ?? {}),
				bestAnswers: Object.keys(account?.meta?.bestAnswers ?? {}),
				ratedAnswers: Object.keys(account?.meta?.ratedAnswers ?? {}),
				questions: Object.keys(account?.meta?.questions ?? {}),
				bestAnsweredQuestions: Object.keys(account?.meta?.bestAnsweredQuestions ?? {}),
				answeredQuestions: Object.keys(account?.meta?.answeredQuestions ?? {}),
				questionComments: Object.keys(account?.meta?.questionComments ?? {}),
				answerComments: Object.keys(account?.meta?.answerComments ?? {}),
				sessions: Object.keys(account?.meta?.sessions ?? {}),
				tutorSessions: Object.keys(account?.meta?.tutorSessions ?? {}),
				currentSession: account?.meta?.currentSession ?? null
			}
		}
		this.rankings = Object.fromEntries(
			Object.keys(RankingPeriods).map((key) => [key, rankings?.[key as RankingPeriods] ?? 0])
		) as Required<UserRankings>
		this.status = {
			streak: status?.streak ?? 0,
			connections: status?.connections ?? {},
			lastSeen: status?.lastSeen ?? 0
		}
		this.tutor = {
			ratings: tutor?.ratings ?? { total: 0, count: 0 },
			subject: tutor?.subject ?? undefined,
			currentSession: tutor?.currentSession ?? null,
			sessionCount: tutor?.sessionCount ?? 0
		}
		this.achievements = getUserAchievements(achievements!)
		this.dates = dates
	}

	get firstName () { return this.userBio.name.first }
	get lastName () { return this.userBio.name.last }
	get fullName () { return this.userBio.name.first + ' ' + this.userBio.name.last }
	get email () { return this.userBio.email }
	get avatar () { return this.userBio.avatar }

	get isOnline () { return Object.keys(this.status.connections).length > 0 }
	get lastSeen () { return this.isOnline ? Date.now() : this.status.lastSeen }

	get averageRating () { return this.tutor?.ratings.count === 0 ? 0 : (this.tutor?.ratings.total ?? 0) / (this.tutor?.ratings.count ?? 1) }
	get ratingCount () { return this.tutor?.ratings.count ?? 0 }
	get orderRating () { return Math.pow(this.tutor?.ratings.total ?? 0, this.averageRating) }
	get currentSession () { return this.account.meta.currentSession || this.tutor?.currentSession || null }
	get subject () { return this.tutor?.subject ?? null }
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	rankings?: UserRankings
	status?: UserStatus
	tutor?: UserTutor
	achievements?: UserAchievements
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
	isStudent: boolean
	isTutor?: boolean
	isAdmin?: boolean
}
export interface UserAccount {
	coins: {
		bronze: number
		gold: number
	},
	xp: number
	meta: {
		answers?: Record<string, boolean>
		bestAnswers?: Record<string, boolean>
		ratedAnswers?: Record<string, boolean>
		answeredQuestions?: Record<string, boolean>
		questions?: Record<string, boolean>
		bestAnsweredQuestions?: Record<string, boolean>
		questionComments?: Record<string, boolean>
		answerComments?: Record<string, boolean>
		sessions?: Record<string, boolean>
		tutorSessions?: Record<string, boolean>
		currentSession?: string
	}
}

type MetaKeys = keyof Omit<UserAccount['meta'], 'currentSession'>
export interface UserMeta extends Record<MetaKeys, string[]> {
	currentSession: string | null
}
export interface UserRankings extends Record<RankingPeriods, number> {}
export interface UserStatus {
	connections: Record<string, boolean>
	lastSeen: number
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
	subject: {
		id: string
		level: number
		upgrades: Record<number, {
			score: number
			takenAt: number
			passed: boolean
		}>
	} | undefined
	currentSession?: string | null
	sessionCount?: number
}
export interface UserAchievements extends Record<keyof typeof Achievements, { completed: boolean, progress: number }> {}

export const generateDefaultBio = (bio: Partial<UserBio>) :UserBio => {
	const first = capitalize(bio?.name?.first ?? 'Anon')
	const last = capitalize(bio?.name?.last ?? 'Ymous')
	const fullName = first + ' ' + last
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const avatar = Avatars[bio?.avatar!] ? bio?.avatar! : Avatars.default.id
	const isNew = !!bio.isNew ?? false
	return { name: { first, last, fullName }, email, description, avatar, isNew }
}
