import { computed, reqRef } from '@nuxtjs/composition-api'
import CreateSubject from '@app/components/modals/create/CreateSubject.vue'
import CreateQuestion from '@app/components/modals/create/CreateQuestion.vue'
import CreateAnswer from '@app/components/modals/create/CreateAnswer.vue'
import EditSubject from '@app/components/modals/edit/EditSubject.vue'
import EditAccountProfile from '@app/components/modals/edit/EditAccountProfile.vue'
import EditTutorSubjects from '@app/components/modals/edit/EditTutorSubjects.vue'
import MakePayment from '@app/components/modals/payments/MakePayment.vue'
import BuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import TipNerd from '@app/components/modals/account/AccountTipNerd.vue'
import ReportUser from '@app/components/modals/account/AccountReportUser.vue'
import MeetTutor from '@app/components/modals/account/AccountMeetTutor.vue'

const global = {
	accountModal: reqRef(null as string | null),
	menuModal: reqRef(null as string | null),
	sessionModal: reqRef(null as string | null),
	stack: reqRef([] as string[])
}

export const ModalTypes = {
	CreateSubject, CreateQuestion, CreateAnswer,
	EditSubject, EditAccountProfile, EditTutorSubjects,
	MakePayment,
	BuyCoins, TipNerd, ReportUser, MeetTutor
} as const
export type ModalKey = keyof typeof ModalTypes

const addToStack = (id: ModalKey) => {
	removeFromStack(id)
	global.stack.value.push(id)
}

const removeFromStack = (id: ModalKey) => {
	const index = global.stack.value.findIndex((i) => i === id)
	if (index > -1) global.stack.value.splice(index)
}

export const useModal = () => {
	return { ModalTypes, stack: global.stack, addToStack, removeFromStack }
}

export const useCreateModal = () => {
	return {
		setCreateModalSubject: () => addToStack('CreateSubject'),
		setCreateModalQuestion: () => addToStack('CreateQuestion'),
		setCreateModalAnswer: () => addToStack('CreateAnswer')
	}
}

export const useEditModal = () => {
	return {
		setEditModalSubject: () => addToStack('EditSubject'),
		setEditModalTutorSubjects: () => addToStack('EditTutorSubjects'),
		setEditModalAccountProfile: () => addToStack('EditAccountProfile')
	}
}

export const useAccountModal = () => {
	return {
		setAccountModalBuyCoins: () => addToStack('BuyCoins'),
		setAccountModalTipNerd: () => addToStack('TipNerd'),
		setAccountModalReportUser: () => addToStack('ReportUser'),
		setAccountModalMeetTutor: () => addToStack('MeetTutor')
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
		setPaymentModalMakePayment: () => addToStack('MakePayment')
	}
}
