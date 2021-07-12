<template>
	<div class="d-flex flex-column gap-2 align-items-center justify-content-center">
		<h4 class="headertext mb-0">
			Available Balance
		</h4>
		<div class="p-3 boxStyle d-flex flex-row col-10 align-content-center justify-content-center">
			<div class="d-flex col-6 gap-2 align-items-center justify-content-center border-end border-light-grey">
				<Coins :size="45" style="z-index: 1;" />
				<span class="largeText">{{ formatNumber(user.account.coins.bronze) }}</span>
			</div>
			<div class="d-flex col-6 gap-2 align-items-center justify-content-center">
				<span class="largeText">{{ formatNumber(user.account.coins.gold) }}</span>
				<Coins :gold="true" :size="45" style="z-index: 1;" />
			</div>
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
		return { formatNumber, openBuyCoins: useAccountModal().openBuyCoins }
	}
})
</script>
<style lang="scss" scoped>
	.boxStyle {
		border: 1px solid $color-line;
		border-radius: 6px;
	}

	.largeText {
		font-weight: bold;
		color: $color-dark;
		font-size: 29px;
	}

	.headertext {
		font-weight: bold;
		color: $color-dark;
	}
</style>
