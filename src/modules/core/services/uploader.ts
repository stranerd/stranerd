import { Media } from '../data/models/base'
import { uploadFile } from './initFirebase'

export const UploaderService = {
	call: async (path: string, file: File): Promise<Media> => {
		return await uploadFile(path, file) as Media
	}
}
