<template>
	<div class="col-12 d-flex flex-column" style="align-items: center; justify-content: center;">
		<div class="text-center my-2 col-12">
			<h4 class="headertext">
				Available Balance
			</h4>
		</div>
		<div class="py-3 px-3 boxStyle d-flex flex-row col-10 " style="align-items: center; justify-content: center;">
			<div class="d-flex flex-row col-6" style="align-items: center; justify-content: center; border-right: 1px solid #c5c5c5;">
				<div class="px-2">
					<Coins :size="45" style="z-index: 1;" />
				</div>
				<div>
					<span class="largeText">{{ formatNumber(user.account.coins.bronze) }}</span>
				</div>
			</div>
			<div class="d-flex flex-row col-6" style="align-items: center; justify-content: center;">
				<div class="px-2">
					<span class="largeText">{{ formatNumber(user.account.coins.gold) }}</span>
				</div>
				<div>
					<Coins :gold="true" :size="45" style="z-index: 1;" />
				</div>
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
		border: 1px solid #c5c5c5;
		border-radius: 6px;
	}

	.largeText {
		font-weight: bold;
		color: $color-text-main;
		font-size: 29px;
	}

	.headertext {
		font-weight: bold;
		color: $color-text-main;
	}
</style>
