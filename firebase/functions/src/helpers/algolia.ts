import algoliaSearch from 'algoliasearch'
import { algolia } from './environment'

export const saveToAlgolia = async (collection: string, id: string ,data: any) => {
	try{
		const { appId, apiKey } = algolia()
		await algoliaSearch(appId, apiKey).initIndex(collection).saveObject({ ...data, objectID: id })
	}catch (e) {
		console.warn(`Error saving ${id} in collection ${collection} to algolia`)
	}
}

export const deleteFromAlgolia = async (collection: string, id: string) => {
	try{
		const { appId, apiKey } = algolia()
		await algoliaSearch(appId, apiKey).initIndex(collection).deleteObject(id)
	}catch (e) {
		console.warn(`Error deleting ${id} in collection ${collection} from algolia`)
	}
}
