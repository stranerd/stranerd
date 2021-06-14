import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modals'

export default defineNuxtMiddleware(() => {
	useModal().removeFromStack('AdminSidebar')
	useModal().removeFromStack('AccountSidebar')
	useModal().removeFromStack('Sidebar')
})
