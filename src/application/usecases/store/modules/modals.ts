import { useContext, computed } from '@nuxtjs/composition-api'

export const Modals = () => {
	const store = useContext().store

	return {
		createModal: computed(() => store.state.modals.createModal as string),
		setCreateModal: (mode: string | null) => store.commit('modals/setCreateModal', mode)
	}
}
