<template>
	<div class="py-5 px-2 content_wrapper">
		<div class="col-lg-10 offset-lg-1 px-0">
			<div class="block-group">
				<div class="block">
					<h5 class="sessionHead">
						Company
					</h5>
					<NuxtLink class="linkText" to="/#">
						About Us
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						Term of Use
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						Privacy Policy
					</NuxtLink>
				</div>
				<div class="block">
					<h5 class="sessionHead">
						<i class="fas fa-circle" style="margin-left: 3px; font-size: 15px;" />
						<i class="fas fa-circle" style="margin-left: 3px; font-size: 15px;" />
						<i class="fas fa-circle" style="margin-left: 3px; font-size: 15px;" />
					</h5>
					<NuxtLink class="linkText" to="/#">
						Terms & Conditions
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						Terms of Service
					</NuxtLink>
				</div>
				<div class="block">
					<h5 class="sessionHead">
						Community
					</h5>
					<NuxtLink class="linkText" to="/#">
						Blog
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						Honor Code
					</NuxtLink>
				</div>
				<!--  TODO: Add legal links -->
				<div class="block">
					<h5 class="sessionHead">
						Help
					</h5>
					<NuxtLink class="linkText" to="/#">
						FAQ
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						Customer Care
					</NuxtLink>
				</div>
			</div>
			<div class="w-100 mt-3 d-flex flex-column gap-1 pt-3 class border-top border-white align-items-center justify-content-center">
				<div class="d-flex gap-2">
					<!--  TODO: Add social links -->
					<NuxtLink class="linkText" to="/#">
						<img src="@app/assets/images/homepage/facebook_icon.png" height="21">
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						<img src="@app/assets/images/homepage/instagram_icon.png" height="21">
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						<img src="@app/assets/images/homepage/twitter_icon.png" height="21">
					</NuxtLink>
					<NuxtLink class="linkText" to="/#">
						<img src="@app/assets/images/homepage/youtube_icon.png" height="21">
					</NuxtLink>
				</div>
				<div class="linkText" style="font-size: 14px;">
					&copy; {{ new Date().getFullYear() }} | Stranerd LLC. All rights reserved.
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
		// align-items: center;
		@media (min-width: $md) { justify-content: center; }
	}
</style>
