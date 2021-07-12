<template>
	<div v-if="user" class="d-flex flex-column gap-2-25">
		<div class="d-flex flex-column align-items-center gap-0-5 p-2 ranking">
			<h3>Balance</h3>
			<NuxtLink class="d-block w-92" to="/account/e-wallet">
				<AccountCoinBalance class="justify-content-center" :user="user" />
			</NuxtLink>
		</div>
		<div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1 align-items-center text-blue">
				<h1 class="ranking-header">
					Achievements
				</h1>
				<img :src="user.rank.image" alt="" class="img-rank">
				<div class="d-flex flex-column gap-1">
					<div v-for="detail in user.rankProgress.progresses" :key="detail.title" class="d-flex justify-content-between align-items-center gap-0-25">
						<span class="stat">{{ detail.title }}</span>
						<ProgressBar :current="detail.progress" />
					</div>
				</div>
			</div>
		</div>
		<div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1 align-items-center text-blue">
				<h1 class="ranking-header">
					Nerd Score
				</h1>
				<donut-chart :score="5000" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'
import DonutChart from '@app/components/users/account/DonutChart.vue'
export default defineComponent({
	name: 'ProfileRightSidebar',
	components: { AccountCoinBalance, DonutChart },
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>

<style lang="scss" scoped>
	.balance {
		background: $color-tags;
		border: 1px solid $color-line;
		width: -webkit-fill-available;
	}

	.ranking {
		background: $color-tags;
		border: 1px solid $color-line;
		padding: 36px;
	}

	.img-rank {
		width: 7.5rem;
	}

	.ranking-header {
		text-align: center;
		font-size: 24px;
		color: $color-dark;
	}
	.stat {
		width: 350px;
		font-size: 14px;
		font-weight: 600;
		color: $color-sub;
	}
</style>
