<template>
	<div v-if="user">
		<div class="d-flex flex-column flex-md-row d-lg-none justify-content-center align-items-center gap-1-5 px-1 py-1-5">
			<div class="col-md-6 d-flex flex-column gap-1 align-items-center">
				<Heading variant="1" class="ranking-header">
					<DynamicText>
						{{ user.id === id ? 'My Rank' : user.firstName + '\'s Badge' }}
					</DynamicText>
				</Heading>
				<img :src="user.rank.image" alt="" class="img-rank">
			</div>
			<div class="border border-line align-self-stretch w-75 mx-auto" style="border-width: 1px !important;" />
			<div class="col-md-6 d-flex flex-column gap-1 align-items-center">
				<Heading variant="1" class="ranking-header">
					<DynamicText>
						{{ user.id === id ? 'My' : user.firstName + '\'s' }} Nerd Score
					</DynamicText>
				</Heading>
				<template v-if="user.id === id">
					<DonutChart :score="user.score" :total="user.score < user.expectedScore ? user.expectedScore : user.score" :size="120" />
					<span class="text-18 text-dark text-center">
						{{
							user.score / user.expectedScore > 0.75 ? 'Your Nerd Score is high. Nice job.' :
							user.score / user.expectedScore > 0.5 ? 'Your Nerd Score is ok but not there yet. Keep pushing.' :
							user.score / user.expectedScore > 0.25 ? 'Your Nerd Score is not strong. You can do better.' :
							'Your Nerd Score is low. Try to bring it up.'
						}}
					</span>
				</template>
				<span v-else class="score">{{ user.formattedScore }}</span>
			</div>
		</div>
		<div class="d-none d-lg-flex flex-column gap-2-25">
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
							<DynamicText class="stat">
								{{ detail.title }}
							</DynamicText>
							<ProgressBar :current="detail.progress" />
						</div>
					</div>
				</div>
			</template>
			<div v-else class="d-flex flex-column gap-1 ranking">
				<div class="d-flex flex-column gap-1 align-items-center text-blue">
					<Heading variant="1" class="ranking-header">
						<DynamicText>
							{{ user.id === id ? 'My Rank' : user.firstName + '\'s Badge' }}
						</DynamicText>
					</Heading>
					<img :src="user.rank.image" alt="" class="img-rank">
				</div>
			</div>
			<div class="d-flex flex-column gap-1 align-items-center ranking">
				<Heading variant="1" class="ranking-header">
					<DynamicText>
						{{ user.id === id ? 'My' : user.firstName + '\'s' }} Nerd Score
					</DynamicText>
				</Heading>
				<template v-if="user.id === id">
					<DonutChart :score="user.score" :total="user.score < user.expectedScore ? user.expectedScore : user.score" :size="120" />
					<span class="text-18 text-dark text-center">
						{{
							user.score / user.expectedScore > 0.75 ? 'Your Nerd Score is high. Nice job.' :
							user.score / user.expectedScore > 0.5 ? 'Your Nerd Score is ok but not there yet. Keep pushing.' :
							user.score / user.expectedScore > 0.25 ? 'Your Nerd Score is not strong. You can do better.' :
							'Your Nerd Score is low. Try to bring it up.'
						}}
					</span>
				</template>
				<span v-else class="score">{{ user.formattedScore }}</span>
			</div>
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
		border-radius: 6px;
		border: 0.5px solid $color-line;
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

	.score {
		font-size: 2rem !important;
		font-weight: 700;
		width: 7.5rem;
		height: 7.5rem;
		border-radius: 10rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: $color-primary;
		color: $color-white;
	}
</style>
