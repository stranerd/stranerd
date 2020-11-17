import * as admin from 'firebase-admin'
import axios from 'axios'
import { isProduction } from './environment'

export const deleteFromStorage = async (path: string | undefined) => {
	try{
		if(!path) return

		if(isProduction()){
			const file = admin.storage().bucket().file(path)
			const exists = (await file.exists())[0]
			if(exists) await file.delete()
		}else{
			await axios.delete('http://localhost:3000/file', { data: { path } })
		}

	} catch (error) { console.warn(`Failed to delete file at ${path}`) }
}
