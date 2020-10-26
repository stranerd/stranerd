import * as admin from 'firebase-admin'
import { authUserCreated } from './auth/onCreate'
import { authUserDeleted } from './auth/onDelete'
import { toggleAdmin } from './onCall/roles/toggleAdmin'
import { userNotificationCreated } from './database/onCreate/notifications'
import { userProfileBioUpdated } from './database/onUpdate/users'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Database Triggers
// On Create
export { userNotificationCreated }
// On Update
export { userProfileBioUpdated }


// On Call
// Roles
export { toggleAdmin }
