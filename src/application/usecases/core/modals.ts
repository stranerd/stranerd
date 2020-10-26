import { computed, ref, useContext } from '@nuxtjs/composition-api'

export const useCreateModal = () => {
	const store = useContext().store
	const state = ref(store.state.modals.createModal)
	return {
		isCreateModalSubject: computed(() => state.value === 'subject'),

		setCreateModalSubject: () => store.commit('setCreateModal', 'subject'),
		closeCreateModal: () => store.commit('setCreateModal', null)
	}
}
