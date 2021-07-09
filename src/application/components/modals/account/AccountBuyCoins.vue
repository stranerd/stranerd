<template>
	<div class="fixedBackground d-flex flex-column" style="align-items: center; justify-content: center;">
		<div class="col-12 col-md-8 col-lg-5 px-1 pb-2 modalStyle d-flex flex-column">
			<div class="col-12 px-2 py-1 main-background-text d-flex flex-row-reverse">
				<div style="cursor: pointer;" @click="closeModal">
					<i class="fas fa-times" />
				</div>
			</div>
			<div class="col-12 px-1 py-1 d-flex flex-row" style="align-items: center; border-bottom: 1px solid #c5c5c5;">
				<div>
					<h4 class="headertext">
						Buy Coins
					</h4>
				</div>
				<div style="margin-left: auto;">
					<AccountCoinBalance :user="user" />
				</div>
			</div>
			<div class="d-flex flex-row" style="align-items: center;">
				<div style="border-right: 1px solid #c5c5c5;" class="d-flex flex-column col-6 px-1 py-0">
					<div>
						<h6 class="headertext py-1">
							Bronze
						</h6>
					</div>
					<div class="d-flex flex-column">
						<div v-for="option in BRONZE_PRICES" :key="option.amount" class="py-1 d-flex flex-row" style="align-items: center;">
							<div class="px-1">
								<img :src="option.src" alt="" height="28">
							</div>
							<div class="normaltext px-1">
								<span>{{ option.amount }}</span>
							</div>
							<div style="margin-left: auto;">
								<button class="btn btn-blue customStyle" :style="'background:' + option.btn_color + ';border-color:' + option.btn_color + ';'" @click="buyCoins(option, false)">
									{{ getLocalAmount(option.price) }} {{ getLocalCurrency() }}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex flex-column col-6 px-1 py-0">
					<div>
						<h6 class="headertext py-1">
							Gold
						</h6>
					</div>
					<div class="d-flex flex-column">
						<div v-for="option in GOLD_PRICES" :key="option.amount" class="py-1 d-flex flex-row" style="align-items: center;">
							<div class="px-1">
								<img :src="option.src" alt="" height="28">
							</div>
							<div class="normaltext px-1">
								<span>{{ option.amount }}</span>
							</div>
							<div style="margin-left: auto;">
								<button class="btn btn-blue customStyle" :style="'background:' + option.btn_color + ';border-color:' + option.btn_color + ';'" @click="buyCoins(option, false)">
									{{ getLocalAmount(option.price) }} {{ getLocalCurrency() }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/commons'
import { useBuyCoins } from '@app/hooks/users/account'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'
import { analytics } from '@modules/core/services/initFirebase'
import { useAccountModal } from '@app/hooks/core/modals'
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
	},
	methods: {
		closeModal () {
			useAccountModal().closeBuyCoins()
		}
	}
})
</script>

<style lang="scss" scoped>
	.fixedBackground {
		position: fixed;
		left: 0%;
		top: 0%;
		z-index: 233;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background: rgba(19, 39, 64, 0.5);
	}

	.modalStyle {
		background: #fff;
		border: 1px solid #fff;
		border-radius: 8px;
	}

	.main-background-text {
		color: $main-background-color;
	}

	.headertext {
		font-weight: bold;
		color: $color-text-main;
	}

	.normaltext {
		font-size: 15px;
		color: $color-text-main;
	}

	.customStyle {
		border-radius: 20px;
	}
</style>
