<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-1-5">
			<h3 class="mb-0">
				Current Balance
			</h3>
			<button class="btn btn-blue rounded-pill btn-sm" @click="setAccountModalBuyCoins">
				Buy coins
			</button>
		</div>
		<div class="bg-light-grey d-flex flex-column flex-xsm-row px-4 py-3 justify-content-around" style="border-radius: 1.25rem;">
			<span class="d-flex align-items-baseline">
				<span class="fw-bold display-3">{{ formatNumber(user.account.coins.bronze) }}</span>
				<Coins :size="40" />
			</span>
			<span class="d-flex align-items-baseline">
				<span class="fw-bold display-3">{{ formatNumber(user.account.coins.gold) }}</span>
				<Coins :gold="true" :size="40" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/commons'
import { useAccountModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'UserCreditBalanceCard',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		return { formatNumber, setAccountModalBuyCoins: useAccountModal().setAccountModalBuyCoins }
	}
})
</script>
