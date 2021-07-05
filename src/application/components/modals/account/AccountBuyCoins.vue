<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Buy Coins
		</template>
		<AccountCoinBalance class="mb-1 px-1-5" :user="user" />
		<div class="d-flex flex-column flex-sm-row gap-2">
			<div class="flex-grow-1">
				<h5>Bronze</h5>
				<div v-for="option in BRONZE_PRICES" :key="option.amount" class="line">
					<img :src="option.src" alt="">
					<span>{{ option.amount }}</span>
					<button class="btn btn-blue" @click="buyCoins(option, false)">
						{{ getLocalAmount(option.price) }} {{ getLocalCurrency() }}
					</button>
				</div>
			</div>
			<div class="flex-grow-1">
				<h5>Gold</h5>
				<div v-for="option in GOLD_PRICES" :key="option.amount" class="line">
					<img :src="option.src" alt="">
					<span>{{ option.amount }}</span>
					<button class="btn btn-blue" @click="buyCoins(option, true)">
						{{ getLocalAmount(option.price) }} {{ getLocalCurrency() }}
					</button>
				</div>
			</div>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/commons'
import { useBuyCoins } from '@app/hooks/users/account'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'
import { analytics } from '@modules/core/services/initFirebase'
export default defineComponent({
	name: 'AccountBuyCoins',
	components: { AccountCoinBalance },
	setup () {
		const { user, getLocalAmount, getLocalCurrency } = useAuth()
		const { loading, error, buyCoins, BRONZE_PRICES, GOLD_PRICES } = useBuyCoins()
		onMounted(() => {
			analytics.logEvent('buy_coins_start')
		})
		return {
			user, getLocalAmount, getLocalCurrency, formatNumber,
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
			min-width: 210px;
		}
	}
</style>
