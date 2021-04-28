import * as admin from 'firebase-admin'
import { isDev } from '../../../utils/environment'

export const getFirebaseAdmin = () => {
	if (admin.apps.length === 0) {
		admin.initializeApp()
		if (isDev) {
			admin.firestore().settings({
				host: 'localhost:5002',
				ssl: false
			})
		}
	}
	return admin
}
