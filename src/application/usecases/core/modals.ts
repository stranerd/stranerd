import { computed, reactive } from '@nuxtjs/composition-api'

const global = reactive({
	createModal: null as string | null,
	editModal: null as string | null
})

export const useCreateModal = () => {
	return {
		isCreateModalSubject: computed(() => global.createModal === 'subject'),

		setCreateModalSubject: () => global.createModal = 'subject',
		closeCreateModal: () => global.createModal = null
	}
}

export const useEditModal = () => {
	return {
		isEditModalTutorSubjects: computed(() => global.editModal === 'tutor-subjects'),

		setEditModalTutorSubjects: () => global.editModal = 'tutor-subjects',
		closeEditModal: () => global.editModal = null
	}
}
