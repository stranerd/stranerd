<template>
	<Modal :close="closeAccountModal">
		<template slot="title">
			Buy Coins
		</template>
		<div class="d-flex justify-content-end">
			<div class="d-flex align-items-center position-relative ml-1">
				<Coins :size="24" style="z-index:1;" />
				<span class="rounded-pill ml-n2 px-2 pl-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.bronze) }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ml-1">
				<Coins :gold="true" :size="24" style="z-index:1;" />
				<span class="rounded-pill ml-n2 px-2 pl-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.gold) }}
				</span>
			</div>
		</div>
		<div class="d-flex">
			<div class="flex-grow-1 mr-4">
				<h5>Bronze</h5>
				<div v-for="option in BRONZE_PRICES" :key="option.amount" class="line">
					<img :src="option.src" alt="">
					<span>{{ option.amount }}</span>
					<button class="btn btn-blue" @click="buyCoins(option, false)">
						{{ option.price }}
					</button>
				</div>
			</div>
			<div class="flex-grow-1">
				<h5>Gold</h5>
				<div v-for="option in GOLD_PRICES" :key="option.amount" class="line">
					<img :src="option.src" alt="">
					<span>{{ option.amount }}</span>
					<button class="btn btn-blue" @click="buyCoins(option, true)">
						{{ option.price }}
					</button>
				</div>
			</div>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/numbers'
import { useBuyCoins } from '@app/hooks/users/account'
export default defineComponent({
	name: 'AccountBuyCoins',
	setup () {
		const { user } = useAuth()
		const { loading, error, buyCoins, BRONZE_PRICES, GOLD_PRICES } = useBuyCoins()
		const { closeAccountModal } = useAccountModal()
		return {
			user, closeAccountModal, formatNumber,
			loading, error, buyCoins, BRONZE_PRICES, GOLD_PRICES
		}
	}
})
</script>

<style lang="scss" scoped>
.line {
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
	font-weight: 600;
	img {
		width: 40px;
		height: 40px;
		margin-right: 0.5rem;
	}
	span {
		font-size: 1.25rem;
		margin-right: 0.5rem;
	}
	button {
		margin-left: auto;
		padding: 0.25rem 3rem;
		border-radius: 10rem;
	}
}
</style>
