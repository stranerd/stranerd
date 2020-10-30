import * as admin from 'firebase-admin'
import { authUserCreated } from './auth/onCreate'
import { authUserDeleted } from './auth/onDelete'
import { toggleAdmin } from './onCall/roles/toggleAdmin'
import { makeTutor } from './onCall/roles/makeTutor'
import { removeTutor } from './onCall/roles/removeTutor'
import { subscribeToMailingList } from './onCall/roles/subscribeToMailingList'
import { userNotificationCreated } from './database/onCreate/notifications'
import { userProfileBioUpdated } from './database/onUpdate/users'
import { subjectIconUpdated } from './database/onUpdate/subjects'
import { subjectDeleted } from './database/onDelete/subjects'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Database Triggers
// On Create
export { userNotificationCreated }
// On Update
export { userProfileBioUpdated, subjectIconUpdated }
// On Delete
export { subjectDeleted }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
