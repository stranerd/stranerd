import firebase, { auth } from '@modules/core/services/initFirebase'
import { FirestoreService } from '@modules/core/services/firebase'
import { AuthBaseDataSource } from './auth-base'

export class AuthFirebaseDataSource implements AuthBaseDataSource {
	public async loginWithEmail (email: string, password: string) {
		const record = await auth.signInWithEmailAndPassword(email, password)
		return record.user?.uid ?? ''
	}

	public async loginWithGoogle () {
		const googleProvider = new firebase.auth.GoogleAuthProvider()
		const record = await auth.signInWithPopup(googleProvider)
		await FirestoreService.update('users', record.user?.uid ?? '', {})
		return record.user?.uid ?? ''
	}

	public async logout (): Promise<void> {
		await auth.signOut()
	}

	public async registerWithEmail (name: string, email: string, password: string) {
		const record = await auth.createUserWithEmailAndPassword(email, password)
		await record.user?.updateProfile({ displayName: name })
		await FirestoreService.update('users', record.user?.uid ?? '', { bio: { name } })
		return record.user?.uid ?? ''
	}

	public async resetPassword (email: string) {
		await auth.sendPasswordResetEmail(email)
	}

	public async updatePassword (email: string, oldPassword: string, password: string) {
		try {
			await auth.signInWithEmailAndPassword(email, oldPassword)
		} catch (error) { throw new Error('Invalid login credentials') }
		await auth.currentUser?.updatePassword(password)
	}
}
