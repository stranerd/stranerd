<template>
	<div>
		<AccountBuyCoins v-if="isAccountModalBuyCoins" />
		<AccountReportUser v-if="isAccountModalReportUser" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import AccountBuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import AccountReportUser from '@app/components/modals/account/AccountReportUser.vue'
export default defineComponent({
	name: 'AccountModalIndex',
	components: {
		AccountBuyCoins,
		AccountReportUser
	},
	setup () {
		const { isAccountModalBuyCoins, isAccountModalReportUser } = useAccountModal()
		return { isAccountModalBuyCoins, isAccountModalReportUser }
	}
})
</script>
