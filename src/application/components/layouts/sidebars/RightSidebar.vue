<template>
	<div class="d-flex flex-column gap-0-5 gap-lg-2-25 background">
		<template v-if="isLoggedIn">
			<div class="d-flex d-lg-none flex-column align-items-center gap-0-5 inner-bg">
				<Avatar :size="72" :src="user.avatar" class="align-self-center" />
				<DynamicText class="name align-self-center text-center">
					{{ user.fullName }}
				</DynamicText>
				<NuxtLink class="btn btn-primary" to="/account/">
					View Profile
				</NuxtLink>
				<NuxtLink class="btn btn-outline-primary" to="/invite/">
					Refer A Friend
				</NuxtLink>
			</div>
			<ProfileHeadCard :user="user" class="inner-bg" />
			<div class="d-flex flex-column gap-1 inner-bg">
				<Heading class="color-dark text-center" no-grow variant="2">
					Ranking Up
				</Heading>
				<div class="d-flex gap-1 align-items-center text-dark">
					<img :src="user.rankImage" alt="" class="img-rank">
					<ProgressBar :current="user.rankProgress" :primary="true" />
					<img v-if="user.nextRank" :src="user.nextRankImage" alt="" class="img-rank">
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
			border: 0.5px solid $color-line;
			background: $color-tags;
			padding: 36px;
			border-radius: 6px;
		}
	}

	.img-rank {
		width: 62px;
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

	.btn {
		width: 100%;
		max-width: 200px;
	}
</style>
