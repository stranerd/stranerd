import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { resendEmails } from './requests/resendEmails'
import { endSession } from './requests/endSession'
import { runDaily, runWeekly, runMonthly, runQuarterly } from './pubsub'

import { toggleAdmin } from './onCall/roles/admins'
import { toggleTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { requestNewSession } from './onCall/sessions/requestNewSession'
import { acceptSession } from './onCall/sessions/acceptSession'
import { cancelSession } from './onCall/sessions/cancelSession'
import { getClientToken } from './onCall/payments/getClientToken'
import { makePayment } from './onCall/payments/makePayment'
import { buyCoins } from './onCall/payments/buyCoins'
import { updateStreak } from './onCall/users/updateStreak'
import { tipNerd } from './onCall/users/tipNerd'
import { markAsBestAnswer } from './onCall/questions/markAsBestAnswer'

import { userProfileUpdated, userAvatarCreated } from './modules/users/users'

import { personalChatsCreated, personalChatMediaDeleted, sessionChatMediaDeleted } from './modules/sessions/chats'

import { questionCommentCreated, questionCommentDeleted, answerCommentCreated, answerCommentDeleted } from './modules/questions/comments'
import { subjectIconUpdated, subjectDeleted } from './modules/questions/subjects'
import { questionCreated, questionDeleted } from './modules/questions/questions'
import { answerCreated, answerDeleted, answerLiked, answerRated } from './modules/questions/answers'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }

// Pub-sub Triggers
export { runDaily, runWeekly, runMonthly, runQuarterly }

// Request Triggers
export { makeSuperAdmin, resendEmails, endSession }

// Users Module
// Users
export { userProfileUpdated, userAvatarCreated }

// Sessions Module
// Chats
export { personalChatsCreated, personalChatMediaDeleted, sessionChatMediaDeleted }

// Questions Module
// Subjects
export { subjectIconUpdated, subjectDeleted }
// Questions
export { questionCreated, questionDeleted }
// Answers
export { answerCreated, answerDeleted, answerLiked, answerRated }
// Comments
export { questionCommentCreated, questionCommentDeleted, answerCommentCreated, answerCommentDeleted }


// On Call
// Roles
export { toggleAdmin, toggleTutor, subscribeToMailingList }
// Sessions
export { requestNewSession, acceptSession, cancelSession }
// Payments
export { getClientToken, makePayment, buyCoins }
// Users
export { updateStreak, tipNerd }
// Questions
export { markAsBestAnswer }
