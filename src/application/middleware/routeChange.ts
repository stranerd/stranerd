import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modals'
import { analytics } from '@modules/core/services/initFirebase'

export default defineNuxtMiddleware(({ route }) => {
	useModal().removeFromStack('AdminSidebar')
	useModal().removeFromStack('RightSidebar')
	useModal().removeFromStack('Sidebar')
	analytics.logEvent('page_view', {
		page_path: route.fullPath
	})
})
