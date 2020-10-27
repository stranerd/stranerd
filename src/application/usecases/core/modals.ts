import { computed } from '@nuxtjs/composition-api'
import { useStore } from '@app/usecases/store'

export const useCreateModal = () => {
	const modals = useStore().modals()
	return {
		isCreateModalSubject: computed(() => modals.createModal.value === 'subject'),

		setCreateModalSubject: () => modals.setCreateModal('subject'),
		closeCreateModal: () => modals.setCreateModal(null)
	}
}
