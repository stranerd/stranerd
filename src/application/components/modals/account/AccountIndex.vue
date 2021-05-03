<template>
	<div>
		<AccountBuyCoins v-if="isAccountModalBuyCoins" />
		<AccountReportUser v-if="isAccountModalReportUser" />
		<AccountTipNerd v-if="isAccountModalTipNerd" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import AccountBuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import AccountReportUser from '@app/components/modals/account/AccountReportUser.vue'
import AccountTipNerd from '@app/components/modals/account/AccountTipNerd.vue'
export default defineComponent({
	name: 'AccountModalIndex',
	components: {
		AccountTipNerd,
		AccountBuyCoins,
		AccountReportUser
	},
	setup () {
		const { isAccountModalBuyCoins, isAccountModalReportUser, isAccountModalTipNerd } = useAccountModal()
		return { isAccountModalBuyCoins, isAccountModalReportUser, isAccountModalTipNerd }
	}
})
</script>
