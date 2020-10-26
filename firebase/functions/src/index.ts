import * as admin from 'firebase-admin'
import { authUserCreated } from './auth/onCreate'
import { authUserDeleted } from './auth/onDelete'
import { toggleAdmin } from './onCall/roles/toggleAdmin'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// On Call
// Roles
export { toggleAdmin }
