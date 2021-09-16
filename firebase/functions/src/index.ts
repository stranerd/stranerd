import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { resendEmails } from './requests/resendEmails'
import { endSession } from './requests/endSession'
import { runDaily, runMonthly, runQuarterly, runWeekly } from './pubsub'
import { toggleAdmin } from './onCall/roles/admins'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { requestNewSession } from './onCall/sessions/requestNewSession'
import { acceptSession } from './onCall/sessions/acceptSession'
import { cancelSession } from './onCall/sessions/cancelSession'
import { makeStripePayment } from './onCall/payments/makePayment'
import { buyCoins } from './onCall/payments/buyCoins'
import { updateStreak } from './onCall/users/updateStreak'
import { rateTutor } from './onCall/users/rateTutor'
import { newReferral } from './onCall/users/newReferral'
import { markAsBestAnswer } from './onCall/questions/markAsBestAnswer'
import {
	userAccountAnswersUpdated,
	userAccountBestAnswersUpdated,
	userAccountDailyLoginUpdated,
	userAccountPurchaseCoinsUpdated,
	userAccountQuestionsUpdated,
	userAccountRatingsUpdated,
	userAccountSessionsUpdated,
	userAccountTutorSessionsUpdated,
	userProfileUpdated
} from './modules/users/users'

import { personalChatMediaDeleted, personalChatsCreated } from './modules/sessions/chats'

import {
	answerCommentCreated,
	answerCommentDeleted,
	questionCommentCreated,
	questionCommentDeleted
} from './modules/questions/comments'
import { questionCreated, questionDeleted, questionUpdated } from './modules/questions/questions'
import { answerCreated, answerDeleted, answerRated, answerUpdated } from './modules/questions/answers'

import { messageCreated } from './modules/forms/messages'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }

// Pub-sub Triggers
export { runDaily, runWeekly, runMonthly, runQuarterly }

// Request Triggers
export { makeSuperAdmin, resendEmails, endSession }

// Users Module
// Users
export {
	userProfileUpdated,
	userAccountRatingsUpdated,
	userAccountTutorSessionsUpdated,
	userAccountSessionsUpdated,
	userAccountQuestionsUpdated,
	userAccountAnswersUpdated,
	userAccountBestAnswersUpdated,
	userAccountDailyLoginUpdated,
	userAccountPurchaseCoinsUpdated
}

// Sessions Module
// Chats
export { personalChatsCreated, personalChatMediaDeleted }

// Questions Module
// Questions
export { questionCreated, questionUpdated, questionDeleted }
// Answers
export { answerCreated, answerUpdated, answerDeleted, answerRated }
// Comments
export { questionCommentCreated, questionCommentDeleted, answerCommentCreated, answerCommentDeleted }

// Forms Module
// Message
export { messageCreated }

// On Call
// Roles
export { toggleAdmin, subscribeToMailingList }
// Sessions
export { requestNewSession, acceptSession, cancelSession }
// Payments
export { makeStripePayment, buyCoins }
// Users
export { updateStreak, rateTutor, newReferral }
// Questions
export { markAsBestAnswer }
