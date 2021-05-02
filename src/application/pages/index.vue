<template>
	<div class="d-flex flex-column flex-md-row align-items-md-center">
		<div class="bg-blob flex-grow-1">
			<h1>A Nerd In Need Is A Friend Indeed.</h1>
			<h5>The help every student deserves.</h5>
			<p>We bring you a platform where you have access to learn from students who have mastery in subjects you need help with; NERDS! that’s what we call them.</p>
			<button class="btn btn-blue mt-4 border border-light-blue btn-lg rounded-lg">
				Join Today
			</button>
		</div>
		<div class="flex-grow-1 img-contain">
			<img src="@app/assets/images/blobs/happy-boys.svg" alt="" class="w-100">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'IndexPage',
	layout: 'home'
})
</script>

<style scoped lang="scss">
.bg-blob {
	background: url("../assets/images/blobs/home-light-blob.svg") top right no-repeat;
	background-size: cover;
	padding: 6rem 1rem;
	@media (min-width: $md) { padding: 8rem 2rem; }
	@media (min-width: $lg) { padding: 8rem 4rem; }
	h1 {
		font-size: 1.875rem;
		font-weight: 600;
		max-width: 75ch;
		margin: 0 0 0.5rem;
		@media (min-width: $md) { font-size: 2.8125rem; }
		@media (min-width: $lg) { font-size: 3.75rem; }
	}
	h5 {
		font-size: 1.25rem;
		font-weight: 600;
		max-width: 75ch;
		margin: 0 0 0.5rem;
		@media (min-width: $md) { font-size: 1.6875rem; }
		@media (min-width: $lg) { font-size: 2.25rem; }
	}
	p {
		font-size: 1rem;
		max-width: 65ch;
		margin: 0;
		@media (min-width: $md) { font-size: 1.125rem; }
		@media (min-width: $lg) { font-size: 1.5rem; }
	}
	@media (min-width: 550px) and (max-width: $md) {
		background-position: bottom center;
	}
	@media (min-width: $md) {
		background-position: center right;
	}
}
.img-contain {
	max-width: 75%;
	align-self: flex-end;
	margin-top: -25%;
	@media (min-width: $md) {
		align-self: center;
		margin-top: 0;
	}
}
</style>
