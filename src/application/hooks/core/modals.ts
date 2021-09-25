import { ssrRef } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modal'
import MakePayment from '@app/components/modals/payments/MakePayment.vue'
import BuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import WithdrawCoins from '@app/components/modals/account/WithdrawCoins.vue'
import RightSidebar from '@app/components/modals/menus/RightSidebarMenu.vue'
import Sidebar from '@app/components/modals/menus/SidebarMenu.vue'
import CreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
import Ratings from '@app/components/modals/sessions/SessionRatings.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'
import AskQuestions from '@app/components/modals/questions/AskQuestions.vue'
import CreateOpening from '@app/components/modals/schedule/createOpening.vue'
import ManageOpenings from '@app/components/modals/schedule/ManageOpenings.vue'
import RequestSession from '@app/components/modals/schedule/RequestSession.vue'
import ScheduleManager from '@app/components/modals/schedule/ScheduleManager.vue'

type AccountTypes = 'BuyCoins' | 'WithdrawCoins'
type MenuTypes = 'RightSidebar' | 'Sidebar'
type SessionTypes = 'CreateSession' | 'Ratings'
type PaymentTypes = 'MakePayment'
type ReportTypes = 'ReportUser' | 'ReportQuestion' | 'ReportAnswer'
type QuestionTypes = 'AskQuestions'
type ScheduleTypes = 'CreateOpening' | 'ManageOpenings' | 'RequestSession' | 'ScheduleManager'

const AccountModals = { BuyCoins, WithdrawCoins } as Record<AccountTypes, any>
const MenuModals = { RightSidebar, Sidebar } as Record<MenuTypes, any>
const SessionModals = { CreateSession, Ratings } as Record<SessionTypes, any>
const PaymentModals = { MakePayment } as Record<PaymentTypes, any>
const ReportModals = { ReportUser, ReportQuestion, ReportAnswer } as Record<ReportTypes, any>
const QuestionModals = { AskQuestions } as Record<QuestionTypes, any>
const ScheduleModals = { CreateOpening, ManageOpenings, RequestSession, ScheduleManager } as Record<ScheduleTypes, any>

export const modal = useModal(ssrRef([] as string[]))
const accountModal = modal.register('Account', AccountModals)
const menuModal = modal.register('Menu', MenuModals)
const sessionModal = modal.register('Session', SessionModals)
const paymentModal = modal.register('Payment', PaymentModals)
const reportModal = modal.register('Report', ReportModals)
const questionModals = modal.register('Question', QuestionModals)
const scheduleModals = modal.register('Question', ScheduleModals)

export const useAccountModal = () => accountModal
export const useMenuModal = () => menuModal
export const useSessionModal = () => sessionModal
export const usePaymentModal = () => paymentModal
export const useReportModal = () => reportModal
export const useQuestionsModal = () => questionModals
export const useScheduleModal = () => scheduleModals
