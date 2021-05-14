<template>
	<div class="d-flex flex-column flex-md-row align-items-md-center justify-content-center">
		<div class="bg-blob">
			<h1>A Nerd In Need Is A Friend Indeed.</h1>
			<h5>The help every student deserves.</h5>
			<p>We bring you a platform where you have access to learn from students who have mastery in subjects you need help with; NERDS! that’s what we call them.</p>
			<NuxtLink to="/auth" class="btn btn-blue mt-3 border border-light-blue px-6 py-2">
				Join Today
			</NuxtLink>
		</div>
		<div class="img-contain">
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	min-height: (100vw * 100/124);
	margin-bottom: 1rem;
	background: url("../assets/images/blobs/home-light-blob.svg") top right no-repeat;
	background-size: cover;
	padding: 2rem 1rem;
	h1 {
		z-index: 1;
		font-size: 2rem;
		font-weight: 600;
		max-width: 75ch;
		margin: 0 0 0.5rem;
		@media (min-width: $md) { font-size: 2.5rem; }
		@media (min-width: $lg) { font-size: 3rem; }
	}
	h5 {
		font-size: 1.25rem;
		z-index: 1;
		font-weight: 600;
		max-width: 75ch;
		margin: 0 0 0.5rem;
		@media (min-width: $md) { font-size: 1.6875rem; }
		@media (min-width: $lg) { font-size: 2.25rem; }
	}
	p {
		font-size: 1rem;
		z-index: 1;
		max-width: 65ch;
		margin: 0;
		@media (min-width: $md) { font-size: 1.125rem; }
		@media (min-width: $lg) { font-size: 1.5rem; }
	}
	a {
		border-radius: 0.5rem;
		z-index: 1;
	}
	@media (min-width: $md) {
		flex-grow: 1;
		padding: 4rem 2rem;
		min-height: (50vw * 100/124);
	}
	@media (min-width: $lg) {
		padding: 4rem;
	}
}
.img-contain {
	max-width: 75%;
	align-self: flex-end;
	margin-top: -25%;
	margin-bottom: 1rem;
	@media (min-width: $md) {
		flex-grow: 1;
		align-self: center;
		margin-top: 0;
	}
}
</style>
