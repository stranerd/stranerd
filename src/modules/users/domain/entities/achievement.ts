export const Achievements = {
	ASK_QUESTIONS: {
		id: 'ASK_QUESTIONS',
		name: 'Scholar',
		description: 'Ask 100 questions',
		limit: 100,
		price: {
			bronze: 40,
			xp: 50
		},
		link: '/images/achievements/scholar.svg'
	},
	STREAK_7_DAYS: {
		id: 'STREAK_7_DAYS',
		name: '7 Day Streak',
		description: 'Complete a 7 day streak',
		limit: 7,
		price: {
			bronze: 35,
			xp: 25
		},
		link: '/images/achievements/crown.svg'
	},
	BUY_GOLD: {
		id: 'BUY_GOLD',
		name: 'Deep Pockets',
		description: 'Buy 100 gold coins',
		limit: 100,
		price: {
			bronze: 20,
			xp: 100
		},
		link: '/images/achievements/deep_pockets.svg'
	},
	BUY_BRONZE: {
		id: 'BUY_BRONZE',
		name: 'Entrepreneur',
		description: 'Buy 100 bronze coins',
		limit: 100,
		price: {
			bronze: 20,
			xp: 50
		},
		link: '/images/achievements/entrepreneur.svg'
	},
	ATTEND_SESSIONS: {
		id: 'ATTEND_SESSIONS',
		name: 'Nerd Indeed',
		description: 'Attend 25 sessions',
		limit: 25,
		price: {
			bronze: 25,
			xp: 100
		},
		link: '/images/achievements/nerd_indeed.svg'
	},
	TIP_NERDS: {
		id: 'TIP_NERDS',
		name: 'Cheerful Giver',
		description: 'Tip nerds 15 times',
		limit: 15,
		price: {
			bronze: 50,
			xp: 50
		},
		link: '/images/achievements/cheerful_giver.svg'
	},
	DAILY_FINISH: {
		id: 'DAILY_FINISH',
		name: 'Legendary',
		description: 'Finish #1 in daily rankings',
		limit: 1,
		price: {
			bronze: 5,
			xp: 50
		},
		link: '/images/achievements/legendary.svg'
	},
	WEEKLY_FINISH: {
		id: 'WEEKLY_FINISH',
		name: 'Weekend Warrior',
		description: 'Finish #1 in weekly rankings',
		limit: 1,
		price: {
			bronze: 25,
			xp: 100
		},
		link: '/images/achievements/weekend_warrior.svg'
	}
} as const

export const getUserAchievements = (achievements: Record<keyof typeof Achievements, { completed: boolean, progress: number }>) => {
	return Object.entries(Achievements).map(([_, achievement]) => {
		const completed = achievements?.[achievement.id]?.completed ?? false
		const progress = achievements?.[achievement.id]?.progress ?? 0
		const isLimitTo1 = achievement.id === Achievements.DAILY_FINISH.id || achievement.id === Achievements.WEEKLY_FINISH.id
		const progressInPercent = isLimitTo1 ? progress === 0 ? 0 : achievement.limit / progress : progress / achievement.limit
		return { ...achievement, completed, progress, isLimitTo1, progressInPercent }
	})
}
