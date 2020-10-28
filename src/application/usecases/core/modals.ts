import { computed, reactive } from '@nuxtjs/composition-api'

const global = reactive({
	createModal: null as string | null
})

export const useCreateModal = () => {
	return {
		isCreateModalSubject: computed(() => global.createModal === 'subject'),

		setCreateModalSubject: () => global.createModal = 'subject',
		closeCreateModal: () => global.createModal = null
	}
}
