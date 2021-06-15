import { reqRef } from '@nuxtjs/composition-api'
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
import AccountSidebar from '@app/components/modals/menus/AccountSidebarMenu.vue'
import AdminSidebar from '@app/components/modals/menus/AdminSidebarMenu.vue'
import Sidebar from '@app/components/modals/menus/SidebarMenu.vue'
import SessionCreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
import SessionNewSessionRequest from '@app/components/modals/sessions/SessionNewSessionRequest.vue'
import SessionStudentCancelled from '@app/components/modals/sessions/SessionStudentCancelled.vue'
import SessionStudentWaiting from '@app/components/modals/sessions/SessionStudentWaiting.vue'
import SessionTutorCancelled from '@app/components/modals/sessions/SessionTutorCancelled.vue'
import SessionUnknown from '@app/components/modals/sessions/SessionUnknown.vue'

const stack = reqRef([] as string[])

export const ModalTypes = {
	CreateSubject, CreateQuestion, CreateAnswer,
	EditSubject, EditAccountProfile, EditTutorSubjects,
	MakePayment,
	BuyCoins, TipNerd, ReportUser, MeetTutor,
	AccountSidebar, AdminSidebar, Sidebar,
	SessionCreateSession, SessionNewSessionRequest, SessionStudentCancelled,
	SessionStudentWaiting, SessionTutorCancelled, SessionUnknown
} as const
export type ModalKey = keyof typeof ModalTypes

const addToStack = (id: ModalKey) => {
	removeFromStack(id)
	stack.value.push(id)
}

const removeFromStack = (id: ModalKey) => {
	const index = stack.value.findIndex((i) => i === id)
	if (index > -1) stack.value.splice(index)
}

export const useModal = () => {
	return { ModalTypes, stack, addToStack, removeFromStack }
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
		setMenuModalSidebar: () => addToStack('Sidebar'),
		setMenuModalAccountSidebar: () => addToStack('AccountSidebar'),
		setMenuModalAdminSidebar: () => addToStack('AdminSidebar')
	}
}

export const useSessionModal = () => {
	return {
		setSessionModalCreateSession: () => addToStack('SessionCreateSession'),
		setSessionModalNewSessionRequest: () => addToStack('SessionNewSessionRequest'),
		setSessionModalStudentWaiting: () => addToStack('SessionStudentWaiting'),
		setSessionModalTutorCancelled: () => addToStack('SessionTutorCancelled'),
		setSessionModalStudentCancelled: () => addToStack('SessionStudentCancelled'),
		setSessionModalUnknown: () => addToStack('SessionUnknown'),

		closeModals: () => {
			removeFromStack('SessionCreateSession')
			removeFromStack('SessionNewSessionRequest')
			removeFromStack('SessionStudentWaiting')
			removeFromStack('SessionStudentCancelled')
			removeFromStack('SessionTutorCancelled')
			removeFromStack('SessionUnknown')
		}
	}
}

export const usePaymentModal = () => {
	return {
		setPaymentModalMakePayment: () => addToStack('MakePayment')
	}
}
