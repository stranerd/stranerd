import { computed, reqSsrRef } from '@nuxtjs/composition-api'

const global = {
	createModal: reqSsrRef(null as string | null),
	editModal: reqSsrRef(null as string | null),
	menuModal: reqSsrRef(null as string | null)
}

export const useCreateModal = () => {
	return {
		isCreateModalSubject: computed(() => global.createModal.value === 'subject'),
		isCreateModalQuestion: computed(() => global.createModal.value === 'question'),
		isCreateModalAnswer: computed(() => global.createModal.value === 'answer'),
		isCreateModalAnswerChallenge: computed(() => global.createModal.value === 'answer-challenge'),

		setCreateModalSubject: () => global.createModal.value = 'subject',
		setCreateModalQuestion: () => global.createModal.value = 'question',
		setCreateModalAnswer: () => global.createModal.value = 'answer',
		setCreateModalAnswerChallenge: () => global.createModal.value = 'answer-challenge',
		closeCreateModal: () => global.createModal.value = null
	}
}

export const useEditModal = () => {
	return {
		isEditModalSubject: computed(() => global.editModal.value === 'subject'),
		isEditModalTutorSubjects: computed(() => global.editModal.value === 'tutor-subjects'),
		isEditModalAccountProfile: computed(() => global.editModal.value === 'account-profile'),

		setEditModalSubject: () => global.editModal.value = 'subject',
		setEditModalTutorSubjects: () => global.editModal.value = 'tutor-subjects',
		setEditModalAccountProfile: () => global.editModal.value = 'account-profile',
		closeEditModal: () => global.editModal.value = null
	}
}

export const useMenuModal = () => {
	return {
		isMenuModalSidebar: computed(() => global.menuModal.value === 'sidebar'),
		isMenuModalAccountSidebar: computed(() => global.menuModal.value === 'account-sidebar'),
		isMenuModalAdminSidebar: computed(() => global.menuModal.value === 'admin-sidebar'),

		setMenuModalSidebar: () => global.menuModal.value = 'sidebar',
		setMenuModalAccountSidebar: () => global.menuModal.value = 'account-sidebar',
		setMenuModalAdminSidebar: () => global.menuModal.value = 'admin-sidebar',
		closeMenuModal: () => global.menuModal.value = null
	}
}
