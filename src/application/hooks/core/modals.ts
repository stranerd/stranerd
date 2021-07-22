import { ssrRef } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modal'
import MakePayment from '@app/components/modals/payments/MakePayment.vue'
import BuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import TipTutor from '@app/components/modals/account/AccountTipTutor.vue'
import RightSidebar from '@app/components/modals/menus/RightSidebarMenu.vue'
import Sidebar from '@app/components/modals/menus/SidebarMenu.vue'
import CreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
import Ratings from '@app/components/modals/sessions/SessionRatings.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'

type AccountTypes = 'BuyCoins' | 'TipTutor'
type MenuTypes = 'RightSidebar' | 'Sidebar'
type SessionTypes = 'CreateSession' | 'Ratings'
type PaymentTypes = 'MakePayment'
type ReportTypes = 'ReportUser' | 'ReportQuestion' | 'ReportAnswer'

const AccountModals = { BuyCoins, TipTutor } as Record<AccountTypes, any>
const MenuModals = { RightSidebar, Sidebar } as Record<MenuTypes, any>
const SessionModals = { CreateSession, Ratings } as Record<SessionTypes, any>
const PaymentModals = { MakePayment } as Record<PaymentTypes, any>
const ReportModals = { ReportUser, ReportQuestion, ReportAnswer } as Record<ReportTypes, any>

export const modal = useModal(ssrRef([] as string[]))
const accountModal = modal.register('Account', AccountModals)
const menuModal = modal.register('Menu', MenuModals)
const sessionModal = modal.register('Session', SessionModals)
const paymentModal = modal.register('Payment', PaymentModals)
const reportModal = modal.register('Report', ReportModals)

export const useAccountModal = () => accountModal
export const useMenuModal = () => menuModal
export const useSessionModal = () => sessionModal
export const usePaymentModal = () => paymentModal
export const useReportModal = () => reportModal
