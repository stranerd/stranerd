<template>
	<div>
		<div class="hero gap-1">
			<div class="text-con mt-3">
				<h3>Get Quick Help, For Homework And Study Problems</h3>
				<h4>Link up with smart students in various subjects.</h4>
				<p>We bring you the #1 Platform that gives you the opportunity to Collaborate, Innovate and get the Tools that make you excel in the student community and beyond.</p>
				<NuxtLink to="/auth" class="btn btn-primary border border-light-blue py-0-75">
					Join Today
				</NuxtLink>
			</div>
			<div>
				<img src="@app/assets/images/homepage/hero-image.png" alt="" class="w-100">
			</div>
		</div>
		<div class="sectionTwo gap-1">
			<div class="phone-img">
				<img src="@app/assets/images/homepage/phone.png" alt="" class="w-100">
			</div>
			<div class="details gap-0-5 gap-lg-1-5">
				<p>
					<span class="d-block">Already Trusted By</span>
					<span class="num d-block bold">30,000+</span>
					<span class="d-block">Students On Social Media</span>
				</p>
				<div>
					<img src="@app/assets/images/homepage/tick.svg" alt="" class="tick">
				</div>
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
.sectionTwo{
	display: flex;
	align-items: center;
	background: $color-blue;
	flex-direction: column-reverse;
	padding: 2rem 2rem 0;
	@media (min-width: $md) {
		flex-direction: row;
		padding: 4rem 4rem 0;
	}
	@media (min-width: $lg) {
		padding: 6rem 6rem 0;
	}
	.details{
		flex-grow: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
		@media (min-width: $lg) {
			flex-direction: row;
			align-items: center;
		}
		p {
			margin: 0;
			color: $color-white;
			font-size: 1.5rem;
			span.num{
				font-size: 4rem;
				line-height: 4rem;
			}
			@media (min-width: $lg) {
				font-size: 2rem;
				span.num {
					font-size: 7.5rem;
					line-height: 7.5rem;
				}
			}
		}
	}
	.phone-img {
		flex: 35%;
	}
	.tick {
		width: 96px;
		height: 96px;
		@media (min-width: $lg) {
			width: 260px;
			height: 260px;
		}
	}
}
</style>
