import { reqRef } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modal'
import MakePayment from '@app/components/modals/payments/MakePayment.vue'
import BuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import TipTutor from '@app/components/modals/account/AccountTipTutor.vue'
import ReportUser from '@app/components/modals/account/AccountReportUser.vue'
import RightSidebar from '@app/components/modals/menus/RightSidebarMenu.vue'
import AdminSidebar from '@app/components/modals/menus/AdminSidebarMenu.vue'
import Sidebar from '@app/components/modals/menus/SidebarMenu.vue'
import CreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
import Ratings from '@app/components/modals/sessions/SessionRatings.vue'

type AccountTypes = 'BuyCoins' | 'TipTutor' | 'ReportUser'
type MenuTypes = 'RightSidebar' | 'AdminSidebar' | 'Sidebar'
type SessionTypes = 'CreateSession' | 'Ratings'
type PaymentTypes = 'MakePayment'

const AccountModals = { BuyCoins, TipTutor, ReportUser } as Record<AccountTypes, any>
const MenuModals = { RightSidebar, AdminSidebar, Sidebar } as Record<MenuTypes, any>
const SessionModals = { CreateSession, Ratings } as Record<SessionTypes, any>
const PaymentModals = { MakePayment } as Record<PaymentTypes, any>

export const modal = useModal(reqRef([] as string[]))
const accountModal = modal.register('Account', AccountModals)
const menuModal = modal.register('Menu', MenuModals)
const sessionModal = modal.register('Session', SessionModals)
const paymentModal = modal.register('Payment', PaymentModals)

export const useAccountModal = () => accountModal
export const useMenuModal = () => menuModal
export const useSessionModal = () => sessionModal
export const usePaymentModal = () => paymentModal
