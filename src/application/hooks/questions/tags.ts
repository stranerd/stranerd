import { reqRef, useFetch } from '@nuxtjs/composition-api'
import { GetTags, TagEntity, ListenToTags } from '@modules/questions'
import { useErrorHandler, useLoadingHandler, useListener } from '@app/hooks/core/states'

const cb = async (entities: TagEntity[]) => {
	global.tags.value = entities
	global.fetched.value = true
}

const global = {
	fetched: reqRef(false),
	tags: reqRef([] as TagEntity[]),
	...useErrorHandler(),
	...useLoadingHandler(),
	listener: useListener(async () => ListenToTags.call(cb))
}

const fetchTags = async () => {
	global.setError('')
	global.setLoading(true)
	try {
		global.tags.value = await GetTags.call()
		global.fetched.value = true
	} catch (error) { global.setError(error) }
	global.setLoading(false)
}

export const useTagsList = () => {
	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTags()
	})

	return { ...global }
}
