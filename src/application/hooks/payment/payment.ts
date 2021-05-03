import { UserBio } from '@modules/users'

let nerdBioAndId = null as { id: string, bio: UserBio } | null
export const setNerdBioAndId = ({ id, bio }: { id: string, bio: UserBio }) => {
	nerdBioAndId = { id, bio }
}

export const useTipNerd = () => {
	return {
		nerdBioAndId
	}
}
