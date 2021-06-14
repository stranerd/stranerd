import { computed, reqRef } from '@nuxtjs/composition-api'
import CreateSubject from '@app/components/modals/create/CreateSubject.vue'

const global = {
	createModal: reqRef(null as string | null),
	editModal: reqRef(null as string | null),
	accountModal: reqRef(null as string | null),
	menuModal: reqRef(null as string | null),
	navigationModal: reqRef(null as string | null),
	sessionModal: reqRef(null as string | null),
	paymentModal: reqRef(null as string | null),
	stack: reqRef([] as string[])
}

export const ModalTypes = { CreateSubject }
export type ModalKey = keyof typeof ModalTypes

export const useCreateModal = () => {
	return {
		isCreateModalSubject: computed(() => global.createModal.value === 'subject'),
		isCreateModalQuestion: computed(() => global.createModal.value === 'question'),
		isCreateModalAnswer: computed(() => global.createModal.value === 'answer'),

		setCreateModalSubject: () => addToStack('CreateSubject'),
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
		isAccountModalTipNerd: computed(() => global.accountModal.value === 'tip-nerd'),
		isAccountModalReportUser: computed(() => global.accountModal.value === 'report-user'),
		isAccountModalMeetTutor: computed(() => global.accountModal.value === 'meet-tutor'),

		setAccountModalBuyCoins: () => global.accountModal.value = 'buy-coins',
		setAccountModalTipNerd: () => global.accountModal.value = 'tip-nerd',
		setAccountModalReportUser: () => global.accountModal.value = 'report-user',
		setAccountModalMeetTutor: () => global.accountModal.value = 'meet-tutor',
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

export const usePaymentModal = () => {
	return {
		isPaymentModalMakePayment: computed(() => global.paymentModal.value === 'make-payment'),

		setPaymentModalMakePayment: () => global.paymentModal.value = 'make-payment',
		closePaymentModal: () => global.paymentModal.value = null
	}
}

export const addToStack = (id: ModalKey) => {
	removeFromStack(id)
	global.stack.value.push(id)
}
export const removeFromStack = (id: ModalKey) => {
	const index = global.stack.value.findIndex((i) => i === id)
	if (index > -1) global.stack.value.splice(index)
}
export const useModal = () => {
	return { ModalTypes, stack: global.stack }
}
