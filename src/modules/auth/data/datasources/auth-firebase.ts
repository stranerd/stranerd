import firebase, { auth } from '@modules/core/services/initFirebase'
import { AuthBaseDataSource } from './auth-base'

export class AuthFirebaseDataSource implements AuthBaseDataSource {
	public async loginWithEmail (email: string, password: string) {
		try {
			const record = await auth.signInWithEmailAndPassword(email, password)
			const user = record.user!
			const idToken = await user.getIdToken(true)
			const data = { idToken, id: user.uid, email: user.email! }
			await auth.signOut()
			return data
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-email': throw new Error('Email address is invalid')
				case 'auth/user-disabled': throw new Error('User account is disabled')
				case 'auth/user-not-found': throw new Error('No user with such email exists')
				case 'auth/wrong-password': throw new Error('Incorrect password. Perhaps you used other login methods')
				default: throw new Error(error.message)
			}
		}
	}

	public async loginWithGoogle () {
		try {
			const googleProvider = new firebase.auth.GoogleAuthProvider()
			const record = await auth.signInWithPopup(googleProvider)
			const user = record.user!
			const idToken = await user.getIdToken(true)
			const data = { idToken, id: user.uid, email: user.email! }
			await auth.signOut()
			return data
		} catch (error) {
			switch (error.code) {
				case 'auth/account-exists-with-different-credential': throw new Error('Account already exists with different credentials. Try signing in with a different method')
				case 'auth/auth-domain-config-required': throw new Error('Auth domain configuration unsuccessful')
				case 'auth/cancelled-popup-request': throw new Error('Operation was cancelled or a new popup was requested')
				case 'auth/operation-not-allowed': throw new Error('Operation is not enabled')
				case 'auth/operation-not-supported-in-this-environment': throw new Error('Application is not supported in your current environment')
				case 'auth/popup-blocked': throw new Error('Your browser is blocking an authentication popup')
				case 'auth/popup-closed-by-user': throw new Error('You closed the popup before completing authentication')
				case 'auth/unauthorized-domain': throw new Error('Current domain is not authorized')
				default: throw new Error(error.message)
			}
		}
	}

	public async registerWithEmail (name: string, email: string, password: string) {
		try {
			const record = await auth.createUserWithEmailAndPassword(email, password)
			const user = record.user!
			await user.updateProfile({ displayName: name })
			const idToken = await user.getIdToken(true)
			const data = { idToken, id: user.uid, email: user.email! }
			await auth.signOut()
			return data
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-email': throw new Error('Email address is invalid')
				case 'auth/email-already-in-use': throw new Error('An account already exists with this email address')
				case 'auth/operation-not-allowed': throw new Error('Operation is not enabled')
				case 'auth/weak-password': throw new Error('Password is not strong enough')
				default: throw new Error(error.message)
			}
		}
	}

	public async logout (): Promise<void> {
		await auth.signOut()
	}

	public async resetPassword (email: string) {
		try {
			await auth.sendPasswordResetEmail(email)
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-email': throw new Error('Email address is invalid')
				case 'auth/user-not-found': throw new Error('No user exists with provided email address')
				case 'auth/auth/invalid-continue-uri': throw new Error('Continue URI is invalid')
				case 'auth/unauthorized-continue-uri': throw new Error('Continue URI is not permitted')
				case 'auth/missing-continue-uri': throw new Error('Continue URI is not provided')
				case 'auth/missing-android-pkg-name': throw new Error('Android package name is not provided')
				case 'auth/missing-ios-bundle-id': throw new Error('IOS bundle id is not provided')
				default: throw new Error(error.message)
			}
		}
	}

	public async updatePassword (email: string, oldPassword: string, password: string) {
		try {
			await auth.signInWithEmailAndPassword(email, oldPassword)
			await auth.currentUser?.updatePassword(password)
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-email': throw new Error('Email address is invalid')
				case 'auth/user-disabled': throw new Error('User account is disabled')
				case 'auth/user-not-found': throw new Error('No user with such email exists')
				case 'auth/wrong-password': throw new Error('Incorrect password. Perhaps you used other login methods')
				case 'auth/weak-password': throw new Error('New password is not strong enough')
				case 'auth/requires-recent-login': throw new Error('Current activity requires you to have logged in recently')
				default: throw new Error(error.message)
			}
		}
	}
}
