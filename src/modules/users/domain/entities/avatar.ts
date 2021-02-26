export const Avatars = {
	default: {
		id: 'default',
		link: '/images/user_profile.svg'
	}
} as const

export type Avatar = keyof typeof Avatars
