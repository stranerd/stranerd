import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import { analytics } from '@modules/core'
import { isClient } from '@utils/environment'

export default defineNuxtMiddleware(async ({ route }) => {
	useMenuModal().closeAll()
	await analytics.logEvent('page_view', {
		page_path: route.fullPath
	})
	if (isClient()) window.scrollTo({ top: 0, left: 0 })
})
