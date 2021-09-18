import { ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetTags, TagEntity } from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	fetched: ssrRef(false),
	tags: ssrRef([] as TagEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchTags = async () => {
	global.setError('')
	global.setLoading(true)
	try {
		global.tags.value = (await GetTags.call()).results
		global.fetched.value = true
	} catch (error) {
		global.setError(error)
	}
	global.setLoading(false)
}

export const useTagsList = () => {
	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTags()
	})

	return { ...global }
}
