import * as admin from 'firebase-admin'
import axios from 'axios'
import { isDev } from './environment'

export const deleteFromStorage = async (path: string | undefined) => {
	try{
		if(!path) return

		if(isDev()){
			await axios.delete('http://localhost:3000/file', { data: { path } })
		}else{
			const file = admin.storage().bucket().file(path)
			const exists = (await file.exists())[0]
			if(exists) await file.delete()
		}

	} catch (error) { console.warn(`Failed to delete file at ${path}`) }
}
