<template>
	<div class="d-flex flex-column flex-lg-row bg-light-grey min-vh-100 p-md-2 p-lg-0">
		<section class="side-left">
			<h1>Sidebar</h1>
		</section>
		<section class="main-view">
			<div class="content mb-3 py-4 text-center d-none d-md-block">
				<h1 class="display-4 mb-2 font-weight-bold text-grey">
					Get your answer today
				</h1>
				<button class="btn btn-red text-white font-weight-bold rounded-pill px-6">
					ASK A QUESTION
				</button>
			</div>
			<div class="content my-2">
				<QuestionsList />
			</div>
		</section>
		<section class="side-right d-flex flex-column flex-md-row flex-lg-column">
			<div class="content mr-md-1 mr-lg-0 mb-1 mb-lg-0">
				<h4 class="d-none d-lg-block text-center">
					Challenges
				</h4>
				<h4>challenges</h4>
			</div>
			<div class="content">
				<TopUsers />
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'RootDashboardPage',
	middleware: ['isAuthenticated']
})
</script>

<style lang="scss" scoped>
.side-left {
	display: none;
	background-color: $color-white;
	@media (min-width: $lg) {
		display: block;
		width: 20%;
		box-shadow: 3px 0 10px rgba($color-black, 0.1);
	}
}
.main-view {
	flex-grow: 0;
	@media (min-width: $md) {
		background-color: inherit;
	}
	@media (min-width: $lg) {
		flex-grow: 1;
		padding: 1rem;
	}
	.content {
		background-color: $color-white;
		padding: 0.5rem;
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
	@media (min-width: $lg) {
		background-color: $color-white;
		padding: 0.5rem;
		width: 25%;
		margin: 0 0 0 auto;
	}
	.content {
		flex-grow: 1;
		padding: 0.5rem;
		background-color: $color-white;
		@media (min-width: $md) {
			border-radius: 0.5rem;
		}
		@media (min-width: $lg) {
			border-radius: 1.0rem;
		}
	}
}
</style>
