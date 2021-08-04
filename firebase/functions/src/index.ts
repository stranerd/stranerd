import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { resendEmails } from './requests/resendEmails'
import { endSession } from './requests/endSession'
import { runDaily, runWeekly, runMonthly, runQuarterly } from './pubsub'
import { toggleAdmin } from './onCall/roles/admins'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { requestNewSession } from './onCall/sessions/requestNewSession'
import { acceptSession } from './onCall/sessions/acceptSession'
import { cancelSession } from './onCall/sessions/cancelSession'
import { makeStripePayment } from './onCall/payments/makePayment'
import { buyCoins } from './onCall/payments/buyCoins'
import { updateStreak } from './onCall/users/updateStreak'
import { tipTutor } from './onCall/users/tipTutor'
import { rateTutor } from './onCall/users/rateTutor'
import { newReferral } from './onCall/users/newReferral'
import { markAsBestAnswer } from './onCall/questions/markAsBestAnswer'
import {
	userProfileUpdated, userAccountRatingsUpdated, userAccountTutorSessionsUpdated, userAccountSessionsUpdated, userAccountQuestionsUpdated,
	userAccountAnswersUpdated, userAccountBestAnswersUpdated, userAccountDailyLoginUpdated, userAccountPurchaseCoinsUpdated
} from './modules/users/users'

import { personalChatsCreated, personalChatMediaDeleted } from './modules/sessions/chats'

import { questionCommentCreated, questionCommentDeleted, answerCommentCreated, answerCommentDeleted } from './modules/questions/comments'
import { questionCreated, questionDeleted } from './modules/questions/questions'
import { answerCreated, answerDeleted, answerRated } from './modules/questions/answers'

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
	userProfileUpdated, userAccountRatingsUpdated, userAccountTutorSessionsUpdated, userAccountSessionsUpdated, userAccountQuestionsUpdated,
	userAccountAnswersUpdated, userAccountBestAnswersUpdated, userAccountDailyLoginUpdated, userAccountPurchaseCoinsUpdated
}

// Sessions Module
// Chats
export { personalChatsCreated, personalChatMediaDeleted }

// Questions Module
// Questions
export { questionCreated, questionDeleted }
// Answers
export { answerCreated, answerDeleted, answerRated }
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
export { updateStreak, tipTutor, rateTutor, newReferral }
// Questions
export { markAsBestAnswer }
