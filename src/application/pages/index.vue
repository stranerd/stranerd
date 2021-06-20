<template>
	<div class="bg-white main-container d-flex w-100">
		<div class="text-con">
			<h3>
				Get Quick Help, For Homework And Study Problems
			</h3>
			<h4>Link up with smart students in various subjects.</h4>
			<p>Link up with smart students in various subjects.</p>
			<NuxtLink to="/auth" class="btn btn-primary mt-1-5 border border-light-blue px-3 py-1">
				Join Today
			</NuxtLink>
		</div>
		<div class="img-contain">
			<img src="@app/assets/images/homepage/hero-image.png" alt="" class="img">
		</div>
	</div>
	<!-- <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-center">
		<div class="bg-blob">
			<h1>Get quick help for your homework...</h1>
			<h5>From smart students in various subjects</h5>
			<p>Stranerd.com offers you the chance to Collaborate, Innovate and get the Tools that make you stand out in the student community and beyond.</p>
			<NuxtLink to="/auth" class="btn btn-blue mt-1-5 border border-light-blue px-3 py-1">
				Join Today
			</NuxtLink>
		</div>
		<div class="img-contain">
			<img src="@app/assets/images/blobs/happy-boys.svg" alt="" class="w-100">
		</div>
	</div> -->
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'IndexPage',
	layout: 'home'
})
</script>

<style scoped lang="scss">
.main-container{
	color: #214A73;
	display: flex;
	align-items: center;
	padding: 5rem;
	.text-con{
		flex-basis: 50%;

		h3{
			font-size: 38px;
			width: 400px;
		}
	}
}

.img-contain {
	flex-basis: 50%;
	max-width: 75%;
	align-self: flex-end;
	margin-top: -25%;
	margin-bottom: 1rem;
	@media (min-width: $md) {
		flex-grow: 1;
		align-self: center;
		margin-top: 0;
	}
	.img{
		max-width: 600px;
	}
}
</style>
