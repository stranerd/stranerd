<template>
	<div class="d-flex flex-column gap-0-75 gap-md-1-5 gap-lg-2-25 mt-1 mt-lg-0 background">
		<template v-if="isLoggedIn">
			<div class="d-flex d-lg-none flex-column gap-0-5 inner-bg">
				<Avatar class="align-self-center" :src="user.avatar" :size="72" />
				<NuxtLink to="/account/" class="btn btn-primary btn-lg">
					<DynamicText class="name align-self-center text-center">
						{{ user.fullName }}
					</DynamicText>
					View Profile
				</NuxtLink>
			</div>
			<ProfileHeadCard :user="user" class="inner-bg" />
			<div class="d-flex flex-column gap-1 inner-bg">
				<h1 class="ranking-header">
					Ranking Up
				</h1>
				<div class="d-flex gap-1 align-items-center text-dark">
					<img :src="user.rank.image" alt="" class="img-rank">
					<ProgressBar :current="user.rankProgress.overall" :primary="true" />
					<img v-if="user.rankProgress.next" :src="user.rankProgress.next.image" alt="" class="img-rank">
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
		<TagsList class="inner-bg" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
import TagsList from '@app/components/questions/tags/TagsList.vue'

export default defineComponent({
	name: 'RightSidebar',
	components: { ProfileHeadCard, TagsList },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		return { id, isLoggedIn, user }
	}
})
</script>

<style lang="scss" scoped>
	.background {
		background: $color-line;
		@media (min-width: $lg) {
			background: unset;
		}
	}

	.inner-bg {
		background: $color-white;
		padding: 30px;
		@media (min-width: $lg) {
			background: $color-tags;
			padding: 36px;
		}
	}

	.img-rank {
		width: 62px;
	}

	.ranking-header {
		text-align: center;
		font-size: 20px;
		color: $color-dark;
	}

	.stat {
		width: 350px;
		font-size: 14px;
		font-weight: 600;
		color: $color-sub;
	}

	.name {
		font-size: 20px;
		color: $color-dark;
		font-weight: 600;
	}
</style>
