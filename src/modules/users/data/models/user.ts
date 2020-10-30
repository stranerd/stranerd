import firebase from 'firebase'
import { UserBio, UserRoles } from '../../domain/entities/user'

export interface UserFromModel {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: {
		signedUpAt: firebase.firestore.Timestamp
	}
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
}
