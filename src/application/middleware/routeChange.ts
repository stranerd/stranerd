import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
import { analytics } from '@modules/core/services/initFirebase'

export default defineNuxtMiddleware(({ route }) => {
	useMenuModal().closeAll()
	analytics.logEvent('page_view', {
		page_path: route.fullPath
	})
})
