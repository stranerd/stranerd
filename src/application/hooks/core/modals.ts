import { useModal } from '@app/hooks/core/modal'
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
import RightSidebar from '@app/components/modals/menus/RightSidebarMenu.vue'
import AdminSidebar from '@app/components/modals/menus/AdminSidebarMenu.vue'
import Sidebar from '@app/components/modals/menus/SidebarMenu.vue'
import CreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
import NewSessionRequest from '@app/components/modals/sessions/SessionNewSessionRequest.vue'
import StudentCancelled from '@app/components/modals/sessions/SessionStudentCancelled.vue'
import StudentWaiting from '@app/components/modals/sessions/SessionStudentWaiting.vue'
import TutorCancelled from '@app/components/modals/sessions/SessionTutorCancelled.vue'
import Unknown from '@app/components/modals/sessions/SessionUnknown.vue'

const CreateModals = { Subject: CreateSubject, Question: CreateQuestion, Answer: CreateAnswer }
const EditModals = { Subject: EditSubject, AccountProfile: EditAccountProfile, TutorSubjects: EditTutorSubjects }
const AccountModals = { BuyCoins, TipNerd, ReportUser, MeetTutor }
const MenuModals = { RightSidebar, AdminSidebar, Sidebar }
const SessionModals = { CreateSession, NewSessionRequest, StudentCancelled, StudentWaiting, TutorCancelled, Unknown }
const PaymentModals = { MakePayment }

type ModalTypes = 'Create' | 'Edit' | 'Account' | 'Menu' | 'Session' | 'Payment'

export const modal = useModal<ModalTypes>({
	Create: CreateModals, Edit: EditModals, Account: AccountModals,
	Menu: MenuModals, Session: SessionModals, Payment: PaymentModals
})

export const useCreateModal = () => modal.getModalHelpers(CreateModals, 'Create')

export const useEditModal = () => modal.getModalHelpers(EditModals, 'Edit')

export const useAccountModal = () => modal.getModalHelpers(AccountModals, 'Account')

export const useMenuModal = () => modal.getModalHelpers(MenuModals, 'Menu')

export const useSessionModal = () => modal.getModalHelpers(SessionModals, 'Session')

export const usePaymentModal = () => modal.getModalHelpers(PaymentModals, 'Payment')
