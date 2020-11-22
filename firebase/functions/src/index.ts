import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { toggleAdmin } from './onCall/roles/admins'
import { makeTutor, removeTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { userNotificationCreated } from './firestore/users/notifications'
import { userProfileUpdated, userCreditsUpdated } from './firestore/users/users'
import { tutorUpdated } from './firestore/users/tutors'
import { sessionChatMediaDeleted } from './firestore/sessions/chats'
import { questionCommentModified, answerCommentModified } from './firestore/questions/comments'
import { subjectUpdated, subjectDeleted } from './firestore/questions/subjects'
import { questionCreated, questionUpdated, questionDeleted } from './firestore/questions/questions'
import { answerCreated, answerUpdated, answerDeleted, answerLikeCreated, answerRatingCreated } from './firestore/questions/answers'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Request Triggers
export { makeSuperAdmin }

// Users Module
// Users
export { userProfileUpdated, userCreditsUpdated }
// Tutors
export { tutorUpdated }
// Notifications
export { userNotificationCreated }

// Sessions Module
// Chats
export { sessionChatMediaDeleted }


// Questions Module
// Subjects
export { subjectUpdated, subjectDeleted }
// Questions
export { questionCreated, questionUpdated, questionDeleted }
// Answers
export { answerCreated, answerUpdated, answerDeleted, answerLikeCreated, answerRatingCreated }
// Comments
export { questionCommentModified, answerCommentModified }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
