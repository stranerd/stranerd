import { computed, ssrRef } from '@nuxtjs/composition-api'

const global = {
	createModal: ssrRef(null as string | null),
	editModal: ssrRef(null as string | null),
	accountModal: ssrRef(null as string | null),
	menuModal: ssrRef(null as string | null),
	navigationModal: ssrRef(null as string | null),
	sessionModal: ssrRef(null as string | null)
}

export const useCreateModal = () => {
	return {
		isCreateModalSubject: computed(() => global.createModal.value === 'subject'),
		isCreateModalQuestion: computed(() => global.createModal.value === 'question'),
		isCreateModalAnswer: computed(() => global.createModal.value === 'answer'),

		setCreateModalSubject: () => global.createModal.value = 'subject',
		setCreateModalQuestion: () => global.createModal.value = 'question',
		setCreateModalAnswer: () => global.createModal.value = 'answer',
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

export const useAccountModal = () => {
	return {
		isAccountModalBuyCoins: computed(() => global.accountModal.value === 'buy-coins'),

		setAccountModalBuyCoins: () => global.accountModal.value = 'buy-coins',
		closeAccountModal: () => global.accountModal.value = null
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

export const useSessionModal = () => {
	return {
		isSessionModalCreateSession: computed(() => global.sessionModal.value === 'create-session'),
		isSessionModalNewSessionRequest: computed(() => global.sessionModal.value === 'new-session-request'),
		isSessionModalStudentWaiting: computed(() => global.sessionModal.value === 'student-waiting'),
		isSessionModalTutorCancelled: computed(() => global.sessionModal.value === 'tutor-cancelled'),
		isSessionModalStudentCancelled: computed(() => global.sessionModal.value === 'student-cancelled'),
		isSessionModalUnknown: computed(() => global.sessionModal.value === 'unknown'),

		setSessionModalCreateSession: () => global.sessionModal.value = 'create-session',
		setSessionModalNewSessionRequest: () => global.sessionModal.value = 'new-session-request',
		setSessionModalStudentWaiting: () => global.sessionModal.value = 'student-waiting',
		setSessionModalTutorCancelled: () => global.sessionModal.value = 'tutor-cancelled',
		setSessionModalStudentCancelled: () => global.sessionModal.value = 'student-cancelled',
		setSessionModalUnknown: () => global.sessionModal.value = 'unknown',

		closeSessionModal: () => global.sessionModal.value = null
	}
}
