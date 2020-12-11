import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { resendEmails } from './requests/resendEmails'
import { toggleAdmin } from './onCall/roles/admins'
import { makeTutor, removeTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { requestNewSession } from './onCall/sessions/requestNewSession'
import { userNotificationCreated } from './modules/users/notifications'
import { userProfileUpdated, userCreditsUpdated } from './modules/users/users'
import { tutorUpdated } from './modules/users/tutors'
import { resetDailyRankings, resetWeeklyRankings, resetMonthlyRankings, resetQuarterlyRankings } from './modules/users/rankings'
import { sessionChatMediaDeleted } from './modules/sessions/chats'
import { questionCommentModified, answerCommentModified } from './modules/questions/comments'
import { subjectUpdated, subjectDeleted } from './modules/questions/subjects'
import { questionCreated, questionUpdated, questionDeleted } from './modules/questions/questions'
import { answerCreated, answerUpdated, answerDeleted, answerLiked, answerRated } from './modules/questions/answers'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Request Triggers
export { makeSuperAdmin, resendEmails }

// Users Module
// Users
export { userProfileUpdated, userCreditsUpdated }
// Tutors
export { tutorUpdated }
// Notifications
export { userNotificationCreated }
// Rankings
export { resetDailyRankings, resetWeeklyRankings, resetMonthlyRankings, resetQuarterlyRankings }

// Sessions Module
// Chats
export { sessionChatMediaDeleted }


// Questions Module
// Subjects
export { subjectUpdated, subjectDeleted }
// Questions
export { questionCreated, questionUpdated, questionDeleted }
// Answers
export { answerCreated, answerUpdated, answerDeleted, answerLiked, answerRated }
// Comments
export { questionCommentModified, answerCommentModified }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
// Sessions
export { requestNewSession }
