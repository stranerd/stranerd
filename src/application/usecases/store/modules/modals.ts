import { useContext, computed } from '@nuxtjs/composition-api'

export const Modals = (store = useContext().store) => {
	const state = store.state.modals

	return {
		createModal: computed(() => state.createModal as string),
		setCreateModal: (mode: string | null) => store.commit('modals/setCreateModal', mode)
	}
}
