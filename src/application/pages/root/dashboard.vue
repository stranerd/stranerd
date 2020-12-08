<template>
	<div class="d-flex flex-column flex-lg-row bg-light-grey min-vh-100 p-md-2 p-lg-0">
		<section class="sidebar">
			<h1>Sidebar</h1>
		</section>
		<section class="questions">
			<div class="content mb-3 py-4 text-center d-none d-md-block">
				<h1 class="display-4 mb-2 font-weight-bold text-grey">
					Get your answer today
				</h1>
				<button class="btn btn-red text-white font-weight-bold rounded-pill px-6">
					ASK A QUESTION
				</button>
			</div>
			<div class="content">
				<QuestionsList />
			</div>
		</section>
		<section class="challenges">
			<h1>Challenges</h1>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'RootDashboardPage'
})
</script>

<style lang="scss" scoped>
section {
	background-color: $color-white;
}
.sidebar {
	display: none;
	@media (min-width: $lg) {
		display: block;
		width: 20%;
		box-shadow: 3px 0 10px rgba($color-black, 0.1);
	}
}
.questions {
	flex-grow: 0;
	@media (min-width: $md) {
		background-color: inherit;
	}
	@media (min-width: $lg) {
		flex-grow: 1;
		padding: 1rem;
	}
}
.challenges {
	width: 100%;
	margin-left: auto;
	@media (min-width: $lg) {
		width: 25%;
		box-shadow: -3px 0 10px rgba($color-black, 0.1);
	}
}
.content {
	background-color: $color-white;
	padding: 0.5rem;
	border-radius: 1rem;
	box-shadow: 0 3px 10px rgba($color-black, 0.1);
	@media (min-width: $md) {
		padding: 0.75rem;
	}
	@media (min-width: $lg) {
		border-radius: 1.5rem;
		padding: 1rem;
	}
}
</style>
