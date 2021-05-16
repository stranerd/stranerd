<template>
	<div>
		<AccountBuyCoins v-if="isAccountModalBuyCoins" />
		<AccountReportUser v-if="isAccountModalReportUser" />
		<AccountTipNerd v-if="isAccountModalTipNerd" />
		<AccountMeetTutor v-if="isAccountModalMeetTutor" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import AccountBuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import AccountReportUser from '@app/components/modals/account/AccountReportUser.vue'
import AccountTipNerd from '@app/components/modals/account/AccountTipNerd.vue'
import AccountMeetTutor from '@app/components/modals/account/AccountMeetTutor.vue'
export default defineComponent({
	name: 'AccountModalIndex',
	components: {
		AccountTipNerd,
		AccountBuyCoins,
		AccountReportUser,
		AccountMeetTutor
	},
	setup () {
		const { isAccountModalBuyCoins, isAccountModalReportUser, isAccountModalTipNerd, isAccountModalMeetTutor } = useAccountModal()
		return { isAccountModalBuyCoins, isAccountModalReportUser, isAccountModalTipNerd, isAccountModalMeetTutor }
	}
})
</script>
