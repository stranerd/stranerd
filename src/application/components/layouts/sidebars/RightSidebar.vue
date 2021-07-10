<template>
	<div class="d-flex flex-column gap-2-25">
		<template v-if="isLoggedIn">
			<ProfileHeadCard :user="user" />
			<div class="d-flex flex-column gap-1 ranking">
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
						<span class="stat">{{ detail.title }}</span>
						<ProgressBar :current="detail.progress" />
					</div>
				</div>
			</div>
		</template>
		<TagsList class="tags" />
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
	.tags {
		background: $color-tags;
		border: 1px solid $color-line;
		padding: 36px;
	}

	.ranking {
		background: $color-tags;
		border: 1px solid $color-line;
		padding: 36px;
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
</style>
