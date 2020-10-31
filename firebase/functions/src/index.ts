import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { toggleAdmin } from './onCall/roles/toggleAdmin'
import { makeTutor } from './onCall/roles/makeTutor'
import { removeTutor } from './onCall/roles/removeTutor'
import { subscribeToMailingList } from './onCall/roles/subscribeToMailingList'
import { subjectIconUpdated, subjectDeleted } from './database/subjects'
import { userNotificationCreated } from './database/notifications'
import { userProfileUpdated } from './firestore/onUpdate/users'

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


// Firestore Triggers
// On Update
export { userProfileUpdated }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
