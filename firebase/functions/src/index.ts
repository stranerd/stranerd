import * as admin from 'firebase-admin'
import { authUserCreated } from './auth/onCreate'
import { authUserDeleted } from './auth/onDelete'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { toggleAdmin } from './onCall/roles/toggleAdmin'
import { makeTutor } from './onCall/roles/makeTutor'
import { removeTutor } from './onCall/roles/removeTutor'
import { subscribeToMailingList } from './onCall/roles/subscribeToMailingList'
import { userNotificationCreated } from './database/onCreate/notifications'
import { subjectIconUpdated } from './database/onUpdate/subjects'
import { subjectDeleted } from './database/onDelete/subjects'
import { userProfileUpdated } from './firestore/onUpdate/users'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Request Triggers
export { makeSuperAdmin }


// Database Triggers
// On Create
export { userNotificationCreated }
// On Update
export { subjectIconUpdated }
// On Delete
export { subjectDeleted }


// Firestore Triggers
// On Update
export { userProfileUpdated }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
