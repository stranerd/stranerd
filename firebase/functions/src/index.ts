import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { resendEmails } from './requests/resendEmails'
import { cancelChallenge } from './requests/cancelChallenge'

import { toggleAdmin } from './onCall/roles/admins'
import { makeTutor, removeTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { requestNewSession } from './onCall/sessions/requestNewSession'

import { userProfileUpdated, userCreditsUpdated } from './modules/users/users'
import { tutorCreated, tutorUpdated, tutorDeleted } from './modules/users/tutors'
import { resetDailyRankings, resetWeeklyRankings, resetMonthlyRankings, resetQuarterlyRankings } from './modules/users/rankings'

import { sessionChatMediaDeleted } from './modules/sessions/chats'

import { questionCommentCreated, questionCommentDeleted, answerCommentCreated, answerCommentDeleted } from './modules/questions/comments'
import { subjectIconUpdated, subjectDeleted } from './modules/questions/subjects'
import { questionCreated, questionUpdated, questionDeleted } from './modules/questions/questions'
import { answerCreated, answerUpdated, answerDeleted, answerLiked, answerRated } from './modules/questions/answers'

import { personalChallengeCreated, personalChallengeCancelled } from './modules/challenges/personal-challenges'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Request Triggers
export { makeSuperAdmin, resendEmails, cancelChallenge }

// Users Module
// Users
export { userProfileUpdated, userCreditsUpdated }
// Tutors
export { tutorCreated, tutorUpdated, tutorDeleted }
// Rankings
export { resetDailyRankings, resetWeeklyRankings, resetMonthlyRankings, resetQuarterlyRankings }

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
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
// Sessions
export { requestNewSession }
