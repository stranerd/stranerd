import { defineNuxtPlugin, onGlobalSetup, watch } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'
import { useAuth, getId, getStudentCurrentSession, getTutorCurrentSession } from '@app/hooks/auth/auth'
import { setStudentSession, setTutorSession } from '@app/hooks/sessions/session'

export default defineNuxtPlugin(async ({ app }) => {
	const router = app.router!

	await firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE)
		.catch(() => {})

	const { isLoggedIn, token, startProfileListener } = useAuth()
	if (isLoggedIn.value && token.value) {
		await firebase.auth()
			.signInWithCustomToken(token.value)
			.catch(() => {})
		await startProfileListener()
	}

	await firebase.firestore()
		.enablePersistence({ synchronizeTabs: true })
		.catch(() => {})

	onGlobalSetup(() => {
		watch(() => getStudentCurrentSession.value, () => {
			if (getStudentCurrentSession.value && getId.value) setStudentSession(getId.value, getStudentCurrentSession.value, router)
		})
		watch(() => getTutorCurrentSession.value, () => {
			if (getTutorCurrentSession.value && getId.value) setTutorSession(getId.value, getTutorCurrentSession.value, router)
		})
	})
})
