<template>
	<div class="py-5 px-2 content_wrapper">
		<div class="col-lg-10 offset-lg-1 px-0">
			<div class="block-group">
				<div class="block">
					<h5 class="sessionHead">
						Company
					</h5>
					<NuxtLink class="linkText" to="/#how-it-works">
						About Us
					</NuxtLink>
					<NuxtLink class="linkText" to="/legal/honor-code">
						Honor Code
					</NuxtLink>
				</div>
				<div class="block">
					<h5 class="sessionHead d-flex gap-0-25" style="font-size: 15px;">
						<i class="fas fa-circle" />
						<i class="fas fa-circle" />
						<i class="fas fa-circle" />
					</h5>

					<NuxtLink class="linkText" to="/legal/privacy-policy">
						Privacy Policy
					</NuxtLink>
					<NuxtLink class="linkText" to="/legal/term-of-service">
						Terms Of Service
					</NuxtLink>
					<NuxtLink class="linkText" to="/legal/terms&condition">
						Terms & Conditions
					</NuxtLink>
				</div>
				<!-- TODO: Add community and help links-->
				<div class="block">
					<h5 class="sessionHead">
						Community
					</h5>
					<NuxtLink class="linkText" to="/questions/create">
						Ask a Question
					</NuxtLink>
					<NuxtLink class="linkText" to="/">
						Blog
					</NuxtLink>
				</div>
				<div class="block">
					<h5 class="sessionHead">
						Help
					</h5>
					<NuxtLink class="linkText" to="/">
						FAQ
					</NuxtLink>
				</div>
			</div>
			<div class="w-100 mt-3 d-flex flex-column gap-1 pt-3 class border-top border-white align-items-center justify-content-center">
				<div class="d-flex gap-2">
					<a class="linkText" href="https://instagram.com/officialstranerd" target="_blank">
						<img src="@app/assets/images/homepage/instagram_white.svg" height="30" alt="">
					</a>
					<a class="linkText" href="https://twitter.com/stranerds" target="_blank">
						<img src="@app/assets/images/homepage/twitter_white.svg" height="30" alt="">
					</a>
					<a class="linkText" href="https://facebook.com/officialstranerd" target="_blank">
						<img src="@app/assets/images/homepage/facebook_white.svg" height="30" alt="">
					</a>
				</div>
				<div class="linkText" style="font-size: 14px;">
					&copy; <DynamicText>{{ new Date().getFullYear() }}</DynamicText> | Stranerd LLC. All rights reserved.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HomeBottomNavigation'
})
</script>

<style lang="scss" scoped>
	.sessionHead {
		font-weight: $font-weight-bold;
	}

	.linkText {
		font-size: 13px;
		text-align: left;
	}

	.content_wrapper {
		background: $color-footer-dark;
		color: $color-line;
	}

	.block-group {
		display: grid;
		grid-gap: 2rem;
		grid-template-columns: repeat(2, 1fr);
		@media (min-width: $md) { grid-template-columns: repeat(4, 1fr); }
	}

	.block {
		display: flex;
		flex-direction: column;
		@media (min-width: $md) { justify-content: center; }
	}
</style>
