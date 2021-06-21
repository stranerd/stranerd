<template>
<div>
	<div class="bg-white sectionOne d-flex w-100">
		<div class="text-con">
			<h3>
				Get Quick Help, <br> For Homework And Study Problems
			</h3>
			<h4>Link up with smart students in various subjects.</h4>
			<p>We bring you the #1 Platform that gives you the opportunity to Collaborate, Innovate and get the Tools that make you excel in the student community and beyond.</p>
			<NuxtLink to="/auth" class="btn btn-primary mt-1-5 border border-light-blue px-3 py-1">
				Join Today
			</NuxtLink>
		</div>
		<div class="img-contain">
			<img src="@app/assets/images/homepage/hero-image.png" alt="" class="img">
		</div>
	</div>
	<div class="sectionTwo">

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
.sectionOne{
	color: #214A73;
	display: flex;
	align-items: center;
	padding: 5rem;
		@media (max-width: $lg) {
				padding: 0rem;

			align-items: flex-start;
		}
		@media (max-width: $md) {
			flex-direction: column;
		}
	.text-con{
		flex-basis: 50%;

		h3{
			font-size: 260%;
			width: 400px;
			margin-left: 60px;
			max-width: 80vw;
			@media (max-width: $md) {
			margin-left: 30px;
			font-size: 24px;
			margin-top: 2.4rem;
		}
		}
		h4{
			margin: 28px 0px 28px 60px;
			font-size: 19px;
			width: 380px;
			max-width: 80vw;
			@media (max-width: $md) {
			margin: 18px 0px 18px 30px;
			font-size: 18px;
			width: 400px;
		}
		}
		p{
			margin-left: 60px;
			width: 450px;
			max-width: 80vw;
			font-size: 18px;
			@media (max-width: $md) {
			margin-left: 30px;
			font-size: 18px;
		}
		}
		.btn{
			margin-left: 60px;
			background: $color-tint-blue;
			@media (max-width: $md) {
			margin-left: 30px;
			padding: 6px 28px !important;
			margin-top: 0 !important;
			margin-bottom: 36px;
			color: white;
		}

		}
	}
}

.img-contain {
	flex-basis: 50%;
	// max-width: 75%;
	width: 100%;
	margin-bottom: 1rem;
		flex-grow: 1;
		align-self: center;
		margin-top: 0;
		@media (max-width: $md) {
			display: flex;
			justify-content: center;
		}
	.img{
			margin: 0px auto;
		width: 80%;
		max-width: 85vw;
		@media (max-width: $lg) {
			width: 100%
		}
		@media (max-width: $md) {
			width: 400px;
		}
	}
}
</style>
