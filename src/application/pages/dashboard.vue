<template>
	<div class="d-flex flex-column flex-lg-row min-vh-100 p-md-2 p-lg-0">
		<section class="side-left">
			<Sidebar />
		</section>
		<section class="main-view">
			<DashboardTopNavigation class="mx-n1" />
			<div class="content mb-3 py-4 text-center d-none d-md-block">
				<h1 class="display-4 mb-2 font-weight-bold text-grey">
					Get your answer today
				</h1>
				<button class="btn btn-red text-white font-weight-bold rounded-pill px-6" @click="openQuestionModal">
					ASK A QUESTION
				</button>
			</div>
			<div class="content my-2">
				<QuestionsList />
			</div>
		</section>
		<section class="side-right d-flex flex-column flex-md-row flex-lg-column">
			<div class="content mr-md-1 mr-lg-0 mb-2 mb-lg-4">
				<h3 class="d-none d-lg-block text-center">
					Challenges
				</h3>
				<div class="body">
					<ChallengesList />
				</div>
			</div>
			<div class="content">
				<h3 class="d-none d-lg-block text-center">
					Rankings
				</h3>
				<div class="body">
					<TopUsers />
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import Sidebar from '@app/components/layouts/sidebars/DefaultSidebar.vue'
import DashboardTopNavigation from '@app/components/layouts/topNavigations/DashboardTopNavigation.vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
import TopUsers from '@app/components/users/rankings/TopUsers.vue'
import ChallengesList from '@app/components/challenges/ChallengesList.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DashboardPage',
	components: {
		Sidebar,
		DashboardTopNavigation,
		QuestionsList,
		TopUsers,
		ChallengesList
	},
	layout: 'dashboard',
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { setCreateModalQuestion } = useCreateModal()
		return {
			openQuestionModal: () => {
				if (!isLoggedIn.value) redirect()
				else setCreateModalQuestion()
			}
		}
	}
})
</script>

<style lang="scss" scoped>
.side-left {
	display: none;
	background-color: $color-white;
	padding: 1rem 0.5rem;
	width: 20%;
	box-shadow: 3px 0 10px rgba($color-black, 0.1);
	@media (min-width: $lg) {
		display: block;
	}
}
.main-view {
	flex-grow: 0;
	padding: 0 0.25rem;
	@media (min-width: $lg) {
		width: 55%;
		padding: 1rem;
	}
	.content {
		background-color: $color-white;
		padding: 0.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 3px 10px rgba($color-black, 0.1);
		@media (min-width: $md) {
			padding: 0.75rem;
			border-radius: 1rem;
		}
		@media (min-width: $lg) {
			border-radius: 1.5rem;
			padding: 1rem;
		}
	}
}
.side-right {
	width: 100%;
	margin: 0.5rem 0;
	padding: 0 0.25rem;
	@media (min-width: $lg) {
		background-color: $color-white;
		padding: 1rem 0.5rem;
		width: 25%;
		margin: 0 0 0 auto;
	}
	.content {
		padding: 0.5rem;
		background-color: $color-white;
		border-radius: 0.5rem;
		@media (min-width: $md) {
			flex-grow: 1;
			border-radius: 1.0rem;
			max-width: 50%;
		}
		@media (min-width: $lg) {
			padding: 0;
			flex-grow: 0;
			max-width: 100%;
		}
		.body {
			@media (min-width: $lg) {
				background-color: lighten($color-light-grey, 5);
				padding: 0.5rem;
				border-radius: 1rem;
			}
		}
	}
}
</style>
