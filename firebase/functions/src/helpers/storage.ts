import * as admin from 'firebase-admin'

export const deleteFromStorage = async (path: string | undefined) => {
	try {
		if (!path) return
		const file = admin.storage().bucket().file(path)
		const exists = (await file.exists())[0]
		if (exists) await file.delete()
	} catch (error) {
		console.warn(`Failed to delete file at ${path}`)
	}
}
