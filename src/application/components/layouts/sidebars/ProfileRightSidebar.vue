<template>
	<div v-if="user" class="d-flex flex-column gap-2-25">
		<template v-if="user.id === id">
			<ProfileHeadCard :user="user" class="balance" />
			<div class="d-flex flex-column gap-1 ranking">
				<h1 class="ranking-header">
					Ranking Up
				</h1>
				<div class="d-flex gap-1 align-items-center text-dark">
					<img :src="user.rank.image" alt="" class="img-rank-2">
					<ProgressBar :current="user.rankProgress.overall" :primary="true" />
					<img v-if="user.rankProgress.next" :src="user.rankProgress.next.image" alt="" class="img-rank-2">
				</div>
				<div class="d-flex flex-column gap-1">
					<div v-for="detail in user.rankProgress.progresses" :key="detail.title" class="d-flex justify-content-between align-items-center gap-0-25">
						<span class="stat">{{ detail.title }}</span>
						<ProgressBar :current="detail.progress" />
					</div>
				</div>
			</div>
		</template>
		<div v-else class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1 align-items-center text-blue">
				<h1 class="ranking-header">
					{{ user.firstName }}'s Badge
				</h1>
				<img :src="user.rank.image" alt="" class="img-rank">
			</div>
		</div>
		<div class="d-flex flex-column gap-1 align-items-center ranking">
			<h1 class="ranking-header">
				{{ user.id === id ? '' : user.firstName + "'s" }} Nerd Score
			</h1>
			<DonutChart :score="user.score <= user.expectedScore ? user.score : user.expectedScore" :total="user.expectedScore" />
			<span v-if="user.id === id" class="text-18 text-dark text-center">
				{{
					user.score / user.expectedScore > 0.75 ? 'Your Nerd Score is high. Nice job.' :
					user.score / user.expectedScore > 0.5 ? 'Your Nerd Score is ok but not there yet. Keep pushing.' :
					user.score / user.expectedScore > 0.25 ? 'Your Nerd Score is not strong. You can do better.' :
					'Your Nerd Score is low. Try to bring it up.'
				}}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'ProfileRightSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { id } = useAuth()
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user, id }
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

	.img-rank-2 {
		width: 3.875rem;
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
