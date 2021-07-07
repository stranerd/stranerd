<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Tip {{ nerdBioAndId.bio.name.first }}
		</template>
		<AccountCoinBalance class="mb-1 px-1-5" :user="user" />
		<div class="d-flex flex-wrap gap-1">
			<button v-for="amount in TIP_AMOUNTS" :key="amount" :disabled="user.account.coins.gold < amount" class="tip btn btn-outline-blue" @click="tipTutor(amount)">
				<span>{{ amount }}</span>
				<Coins :gold="true" :size="20" />
			</button>
		</div>
		<div class="d-flex justify-content-center my-1-5">
			<span>Out of gold coins?&nbsp;</span>
			<a class="fw-bold text-decoration-underline" @click="openBuyCoins">Buy more coins</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useTipTutor } from '@app/hooks/users/account'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/commons'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'
import { analytics } from '@modules/core/services/initFirebase'
export default defineComponent({
	name: 'AccountTipTutor',
	components: { AccountCoinBalance },
	setup () {
		const { user } = useAuth()
		const { loading, error, nerdBioAndId, TIP_AMOUNTS, tipTutor } = useTipTutor()
		const openBuyCoins = useAccountModal().openBuyCoins
		onMounted(() => {
			analytics.logEvent('tip_nerd_start')
		})
		return {
			user, formatNumber, TIP_AMOUNTS,
			loading, error, nerdBioAndId,
			tipTutor, openBuyCoins
		}
	}
})
</script>

<style lang="scss" scoped>
	.tip {
		border-radius: 0.5rem;
		font-weight: bold;
		padding: 0.25rem 0.75rem;
		display: flex;
		align-items: center;
		span { margin-right: 0.25rem; }
	}
</style>
