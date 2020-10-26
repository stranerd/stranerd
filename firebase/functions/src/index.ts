import * as admin from 'firebase-admin'
import { authUserCreated } from './auth/onCreate'
import { authUserDeleted } from './auth/onDelete'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }
