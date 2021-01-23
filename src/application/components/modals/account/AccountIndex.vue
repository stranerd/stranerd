<template>
	<div>
		<AccountBuyCoins v-if="isAccountModalBuyCoins" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import AccountBuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
export default defineComponent({
	name: 'AccountModalIndex',
	components: {
		AccountBuyCoins
	},
	setup () {
		const { isAccountModalBuyCoins } = useAccountModal()
		return { isAccountModalBuyCoins }
	}
})
</script>
