import algoliaSearch from 'algoliasearch'
import { environmentVariables } from './environment'

const { appId, apiKey } = environmentVariables.algolia

export const saveToAlgolia = async (collection: string, id: string ,data: any) => {
	try{
		await algoliaSearch(appId, apiKey).initIndex(collection).saveObject({ ...data, objectID: id })
	}catch (e) {
		console.warn(`Error saving ${id} in collection ${collection} to algolia`)
	}
}

export const deleteFromAlgolia = async (collection: string, id: string) => {
	try{
		await algoliaSearch(appId, apiKey).initIndex(collection).deleteObject(id)
	}catch (e) {
		console.warn(`Error deleting ${id} in collection ${collection} from algolia`)
	}
}
