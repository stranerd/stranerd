<template>
	<div class="p-1">
		<template v-if="isLoggedIn">
			<ProfileHeadCard :user="user" />
			<div class="thick mx-n1" />
			<div class="d-flex flex-column gap-1">
				<h1 class="ranking-header">
					Ranking Up
				</h1>
				<div class="d-flex justify-content-between align-items-center text-main">
					<span>{{ user.rank.id }}</span>
					<ProgressBar :current="user.rankProgress.overall" color="#00F332" class="mx-0-25" />
					<span>{{ user.rankProgress.next && user.rankProgress.next.id }}</span>
				</div>
				<div class="d-flex flex-column ">
					<div v-for="detail in user.rankProgress.progresses" :key="detail.title" class="d-flex justify-content-between align-items-center mt-1">
						<span class="stat">{{ detail.title }}</span>
						<ProgressBar :current="detail.progress" class="mx-0-25" />
					</div>
				</div>
			</div>
			<div class="thick mx-n1" />
			<TagsList />
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
