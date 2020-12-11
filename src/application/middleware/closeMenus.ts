import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'

export default defineNuxtMiddleware(() => {
	useMenuModal().closeMenuModal()
})
