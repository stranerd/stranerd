import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { resendEmails } from './requests/resendEmails'
import { cancelChallenge } from './requests/cancelChallenge'

import { runDaily, runWeekly, runMonthly, runQuarterly } from './pubsub'

import { toggleAdmin } from './onCall/roles/admins'
import { toggleTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { requestNewSession } from './onCall/sessions/requestNewSession'
import { getClientToken } from './onCall/payments/getClientToken'
import { makePayment } from './onCall/payments/makePayment'

import { userProfileUpdated, userCreditsUpdated } from './modules/users/users'

import { sessionChatMediaDeleted } from './modules/sessions/chats'

import { questionCommentCreated, questionCommentDeleted, answerCommentCreated, answerCommentDeleted } from './modules/questions/comments'
import { subjectIconUpdated, subjectDeleted } from './modules/questions/subjects'
import { questionCreated, questionUpdated, questionDeleted } from './modules/questions/questions'
import { answerCreated, answerUpdated, answerDeleted, answerLiked, answerRated } from './modules/questions/answers'

import { personalChallengeCreated, personalChallengeCancelled } from './modules/challenges/personal-challenges'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }

// Pub-sub Triggers
export { runDaily, runWeekly, runMonthly, runQuarterly }

// Request Triggers
export { makeSuperAdmin, resendEmails, cancelChallenge }

// Users Module
// Users
export { userProfileUpdated, userCreditsUpdated }

// Sessions Module
// Chats
export { sessionChatMediaDeleted }


// Questions Module
// Subjects
export { subjectIconUpdated, subjectDeleted }
// Questions
export { questionCreated, questionUpdated, questionDeleted }
// Answers
export { answerCreated, answerUpdated, answerDeleted, answerLiked, answerRated }
// Comments
export { questionCommentCreated, questionCommentDeleted, answerCommentCreated, answerCommentDeleted }


// Challenges Module
// Personal Challenges
export { personalChallengeCreated, personalChallengeCancelled }


// On Call
// Roles
export { toggleAdmin, toggleTutor, subscribeToMailingList }
// Sessions
export { requestNewSession }
// Payments
export { getClientToken, makePayment }
