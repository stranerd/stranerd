export const Avatars = {
	default: {
		id: 'default',
		link: '/images/avatars/user_profile.svg'
	},
	male1: {
		id: 'male1',
		link: '/images/avatars/male1.svg'
	},
	male2: {
		id: 'male2',
		link: '/images/avatars/male2.svg'
	},
	male3: {
		id: 'male3',
		link: '/images/avatars/male3.svg'
	},
	male4: {
		id: 'male4',
		link: '/images/avatars/male4.svg'
	},
	male5: {
		id: 'male5',
		link: '/images/avatars/male5.svg'
	},
	male6: {
		id: 'male6',
		link: '/images/avatars/male6.svg'
	},
	female1: {
		id: 'female1',
		link: '/images/avatars/female1.svg'
	},
	female2: {
		id: 'female2',
		link: '/images/avatars/female2.svg'
	},
	female3: {
		id: 'female3',
		link: '/images/avatars/female3.svg'
	},
	female4: {
		id: 'female4',
		link: '/images/avatars/female4.svg'
	},
	female5: {
		id: 'female5',
		link: '/images/avatars/female5.svg'
	},
	female6: {
		id: 'female6',
		link: '/images/avatars/female6.svg'
	}
} as const

export type Avatar = keyof typeof Avatars
