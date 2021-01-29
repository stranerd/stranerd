import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const makeSuperAdmin = functions.https.onRequest(async (_, response) => {
	try {
		const user = await admin.auth().getUserByEmail('kevinfizu@gmail.com')
		if (user) {
			await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true })
			await admin.database()
				.ref('profiles')
				.child(user.uid)
				.child('roles/isAdmin')
				.set(true)
			response.json({ message: 'kevinfizu@gmail.com upgraded to admin' }).end()
		} else {
			response.status(400).json({ message: 'kevinfizu@gmail.com doesn\'t exist' }).end()
		}
	} catch (e) {
		response.status(400).json({ error: e }).end()
	}
})
