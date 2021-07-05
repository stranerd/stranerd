<template>
	<div class="p-1">
		<template v-if="isLoggedIn">
			<ProfileHeadCard :user="user" />
			<div class="thick mx-n1" />
			<div class="d-flex flex-column">
				<h1 class="ranking-header">
					Ranking Up
				</h1>

				<div class="d-flex justify-content-between align-items-center mt-1 text-main">
					<span>{{ user.rank.id }}</span>
					<ProgressBar :current="user.rankProgress.overall" color="#00F332" class="mx-1" />
					<span>{{ user.rankProgress.next && user.rankProgress.next.id }}</span>
				</div>
				<div class="mt-1 d-flex flex-column ">
					<div v-for="detail in user.rankProgress.progresses" :key="detail.title" class="d-flex justify-content-between align-items-center mt-1">
						<span class="stat">{{ detail.title }}</span>
						<ProgressBar :current="detail.progress" class="mx-1" />
					</div>
				</div>
			</div>
			<div class="thick mx-n1" />
			<div class="d-flex flex-column w-100">
				<h1 class="ranking-header">
					Popular Tags
				</h1>
				<div class="tag-body d-flex flex-wrap mt-2">
					<Tags v-for="n in tags" :key="n" :name="n" class="m-1" />
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'RightSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		const tags = ['trigonometry', 'waves', 'e-mc2', 'motion', 'electromagnets', 'indices']
		return { id, isLoggedIn, user, tags }
	}
})
</script>

<style lang="scss" scoped>
	.ranking-header {
		text-align: center;
		font-size: 20px;
		color: $color-text-main;
	}

	.mx-1 {
		margin: 0 4px !important;
	}

	.m-1 {
		margin: 6px !important;
	}

	.stat {
		width: 350px;
		font-size: 14px;
		color: $color-text-sub;
	}

	.text-main {
		color: $color-main;
	}
</style>
