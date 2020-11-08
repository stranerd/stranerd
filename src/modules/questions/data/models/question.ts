import firebase from 'firebase'
import { UserBio } from '@modules/users'
import { Media } from '@modules/core/data/models/base'

export interface QuestionFromModel {
	id: string
	body: string
	attachments: Media[]
	subjectId: string
	userId: string
	user: UserBio
	answerId?: string
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface QuestionToModel {
	body: string
	attachments: Media[]
	answerId?: string
	subjectId: string
	userId: string
	user?: UserBio
}
