import firebase, { auth } from '@modules/core/services/initFirebase'
import { AxiosInstance } from '@modules/core/services/http'
import { DatabaseService } from '@modules/core/services/firebase'
import { AuthBaseDataSource } from './auth-base'

export class AuthFirebaseDataSource implements AuthBaseDataSource {
	async signinWithEmail (email: string, password: string) {
		try {
			const record = await auth.signInWithEmailAndPassword(email, password)
			return await getUserDetails(record.user!)
		} catch (error) { throw filterFirebaseError(error) }
	}

	async signinWithGoogle () {
		try {
			const googleProvider = new firebase.auth.GoogleAuthProvider()
			const record = await auth.signInWithPopup(googleProvider)
			return await getUserDetails(record.user!)
		} catch (error) { throw filterFirebaseError(error) }
	}

	async signupWithEmail (name: string, email: string, password: string) {
		try {
			const record = await auth.createUserWithEmailAndPassword(email, password)
			const user = record.user!
			await user.updateProfile({ displayName: name })
			await DatabaseService.update(`profiles/${user.uid}/bio`, { name })
			return await getUserDetails(user)
		} catch (error) { throw filterFirebaseError(error) }
	}

	async sendSigninEmail (email: string, redirectUrl: string) {
		try {
			await auth.sendSignInLinkToEmail(email, {
				url: redirectUrl,
				handleCodeInApp: true
			})
		} catch (error) { throw filterFirebaseError(error) }
	}

	async signinWithEmailLink (email: string, emailUrl: string) {
		if (!auth.isSignInWithEmailLink(emailUrl)) throw new Error('Url is not a valid email link')
		try {
			const record = await auth.signInWithEmailLink(email, emailUrl)
			return await getUserDetails(record.user!)
		} catch (error) { throw filterFirebaseError(error) }
	}

	async resetPassword (email: string) {
		try {
			await auth.sendPasswordResetEmail(email)
		} catch (error) { throw filterFirebaseError(error) }
	}

	async updatePassword (email: string, oldPassword: string, password: string) {
		try {
			await auth.signInWithEmailAndPassword(email, oldPassword)
			await auth.currentUser?.updatePassword(password)
			await auth.signOut()
		} catch (error) { throw filterFirebaseError(error) }
	}

	async session (idToken: string) {
		try {
			const { data } = await AxiosInstance.post('/auth/signin', { idToken })
			if (!data.success) throw new Error(data.error)
		} catch (error) { throw new Error(error?.response?.data?.error ?? 'Error signing in') }
	}

	async logout () {
		try {
			const { data } = await AxiosInstance.post('/auth/signout', {})
			if (!data.success) throw new Error(data.error)
		} catch (error) { throw new Error(error?.response?.data?.error ?? 'Error signing out') }
	}
}

const getUserDetails = async (user: firebase.User) => {
	const idToken = await user.getIdToken(true)
	const data = { idToken, id: user.uid }
	await auth.signOut()
	return data
}

const filterFirebaseError = (error: any) => {
	switch (error.code) {
		case 'auth/invalid-email': return new Error('Email address is invalid')
		case 'auth/network-request-failed': return new Error('Network connection failed. Ensure you have a good network connection')
		case 'auth/user-disabled': return new Error('User account is disabled')
		case 'auth/user-not-found': return new Error('No user with provided email exists')
		case 'auth/wrong-password': return new Error('Incorrect password. Perhaps you used other signin methods')

		case 'auth/account-exists-with-different-credential': return new Error('Account already exists with different credentials. Try signing in with a different method')
		case 'auth/auth-domain-config-required': return new Error('Auth domain configuration unsuccessful')
		case 'auth/cancelled-popup-request': return new Error('Operation was cancelled or a new popup was requested')
		case 'auth/operation-not-allowed': return new Error('Operation is not enabled')
		case 'auth/operation-not-supported-in-this-environment': return new Error('Application is not supported in your current environment')
		case 'auth/popup-blocked': return new Error('Your browser is blocking an authentication popup')
		case 'auth/popup-closed-by-user': return new Error('You closed the popup before completing authentication')
		case 'auth/unauthorized-domain': return new Error('Current domain is not authorized')

		case 'auth/email-already-in-use': return new Error('An account already exists with this email address')
		case 'auth/weak-password': return new Error('Password is not strong enough')

		case 'auth/invalid-continue-uri': return new Error('Continue URI is invalid')
		case 'auth/unauthorized-continue-uri': return new Error('Continue URI is not permitted')
		case 'auth/missing-continue-uri': return new Error('Continue URI is not provided')
		case 'auth/missing-android-pkg-name': return new Error('Android package name is not provided')
		case 'auth/missing-ios-bundle-id': return new Error('IOS bundle id is not provided')

		case 'auth/requires-recent-login': return new Error('Current activity requires you to have logged in recently')
		case 'auth/expired-action-code': return new Error('Link has expired')

		default: return new Error(error.message)
	}
}
