<template>
	<div class="rightSidebar">
		<template v-if="isLoggedIn">
			<div class="d-flex flex-column align-items-center">
				<ProfileHeadCard :user="user" class="balance" />
				<div class="d-flex flex-column gap-1 ranking">
					<h1 class="ranking-header">
						Ranking Up
					</h1>
					<div class="d-flex justify-content-between align-items-center text-main">
						<!-- <span>{{ user.rank.id }}</span> -->
						<img src="@app/assets/images/ranking/rookie.svg" alt="" class="img-rank">
						<RankingProgressBar :current="user.rankProgress.overall" color="#00F332" :primary="true" class="mx-1" />
						<img src="@app/assets/images/ranking/comrade.svg" alt="" class="img-rank">
					<!-- <span>{{ user.rankProgress.next && user.rankProgress.next.id }}</span> -->
					</div>
					<div class="d-flex flex-column ">
						<div v-for="detail in user.rankProgress.progresses" :key="detail.title" class="d-flex justify-content-between align-items-center mt-1">
							<span class="stat">{{ detail.title }}</span>
							<ProgressBar :current="detail.progress" class="mx-0-25" />
						</div>
					</div>
				</div>

				<TagsList class="tags" />
			</div>
		</template>
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
.tags{
	background: $color-tags;
	border: 1px solid $color-line;
	width: -webkit-fill-available;
	padding: 36px;
	margin-top: 36px;
}
.ranking{
	background: $color-tags;
	border: 1px solid $color-line;
	width: -webkit-fill-available;
	padding: 36px;
	margin-top: 36px;
}
	.rightSidebar{
		padding-top: 60px;
		padding-right: 48px;
	}
	.img-rank {
		width: 48px;
	}

	.ranking-header {
		text-align: center;
		font-size: 20px;
		color: $color-text-main;
	}

	.stat {
		width: 350px;
		font-size: 14px;
		color: $color-text-sub;
	}

	.text-main {
		color: $color-main;
	}

	.tag-input {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 36px;

		input {
			border: 1.2px solid $color-line;
			background-color: $color-white;
			height: 42px;
			border-radius: 50px;
			width: 100%;
			color: $color-text-sub;
			padding: 0 5px 0 18px;
		}

		button {
			border: 1.2px solid $color-line;
			background-color: $color-tags;
			height: 42px;
			border-radius: 50px;
			color: $color-text-main;
			position: absolute;
			right: 17px;
			padding: 8px 17px;
		}
	}
</style>
