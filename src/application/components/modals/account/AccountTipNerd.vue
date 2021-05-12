<template>
	<Modal :close="closeAccountModal">
		<template slot="title">
			Tip {{ nerdBioAndId.bio.name.first }}
		</template>
		<div class="d-flex justify-content-end px-3 mb-2">
			<div class="d-flex align-items-center position-relative ms-1">
				<Coins :size="24" style="z-index:1;" />
				<span class="rounded-pill ms-n2 px-2 ps-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.bronze) }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ms-1">
				<Coins :gold="true" :size="24" style="z-index:1;" />
				<span class="rounded-pill ms-n2 px-2 ps-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.gold) }}
				</span>
			</div>
		</div>
		<div class="d-flex flex-wrap gap-2">
			<button v-for="amount in TIP_AMOUNTS" :key="amount" :disabled="user.account.coins.gold < amount" class="tip btn btn-outline-blue" @click="tipNerd(amount)">
				<span>{{ amount }}</span>
				<Coins :gold="true" :size="20" />
			</button>
		</div>
		<div class="d-flex justify-content-center my-3">
			<span>Out of gold coins?&nbsp;</span>
			<a class="fw-bold text-decoration-underline" @click="setAccountModalBuyCoins">Buy more coins</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useTipNerd } from '@app/hooks/users/account'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/commons'
export default defineComponent({
	name: 'AccountTipNerd',
	setup () {
		const { user } = useAuth()
		const { loading, error, nerdBioAndId, TIP_AMOUNTS, tipNerd } = useTipNerd()
		const { closeAccountModal, setAccountModalBuyCoins } = useAccountModal()
		return {
			user, formatNumber, TIP_AMOUNTS,
			loading, error, nerdBioAndId,
			tipNerd, closeAccountModal, setAccountModalBuyCoins
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
