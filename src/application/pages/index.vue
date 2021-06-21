<template>
	<div>
		<div class="hero gap-1">
			<div class="text-con">
				<div class="d-md-none my-3" />
				<h3>Get Quick Help, For Homework And Study Problems</h3>
				<h4>Link up with smart students in various subjects.</h4>
				<p>Link up with smart students in various subjects.</p>
				<NuxtLink to="/auth" class="btn btn-primary border border-light-blue py-0-75">
					Join Today
				</NuxtLink>
			</div>
			<div>
				<img src="@app/assets/images/homepage/hero-image.png" alt="" class="w-100">
			</div>
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
.hero{
	min-height: calc(50vh - 60px);
	color: #214A73;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	@media (min-width: $md) {
		flex-direction: row;
		align-items: center;
		padding: 4rem;
	}
	@media (min-width: $lg) {
		padding: 6rem;
		min-height: calc(100vh - 60px);
	}
	.text-con{
		h3, h4 { font-weight: bold; }
		p { margin-bottom: 0.5rem; }
		h3 { font-size: 1.5rem; }
		h4 { font-size: 1.125rem; }
		p { font-size: 1rem; }
		a { font-size: 1rem; }
		@media (min-width: $lg) {
			h3 { font-size: 2.5rem; }
			h4 { font-size: 1.875rem; }
			p { font-size: 1.5rem; }
			a { font-size: 1.5rem; }
		}
	}
}
</style>
