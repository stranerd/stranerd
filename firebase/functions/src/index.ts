import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { toggleAdmin } from './onCall/roles/admins'
import { makeTutor, removeTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { subjectIconUpdated, subjectDeleted } from './database/subjects'
import { userNotificationCreated } from './database/notifications'
import { userProfileUpdated, userCreditsUpdated } from './database/users'
import { questionCommentModified, answerCommentModified } from './database/comments'
import { sessionChatMediaDeleted } from './database/chats'
import { questionCreated, questionUpdated, questionDeleted } from './firestore/questions'
import { answerCreated, answerDeleted } from './firestore/answers'
import { tutorUpdated } from './firestore/tutors'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Request Triggers
export { makeSuperAdmin }


// Database Triggers
// Subjects
export { subjectIconUpdated, subjectDeleted }
// Notifications
export { userNotificationCreated }
// Users
export { userProfileUpdated, userCreditsUpdated }
// Comments
export { questionCommentModified, answerCommentModified }
// Chats
export { sessionChatMediaDeleted }


// Firestore Triggers
// Tutors
export { tutorUpdated }
// Questions
export { questionCreated, questionUpdated, questionDeleted }
// Answers
export { answerCreated, answerDeleted }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
