<template>
	<footer>
		<div class="content">
			<div class="links">
				<div>
					<h4>Company</h4>
					<NuxtLink to="/how-it-works">
						About Us
					</NuxtLink>
					<a target="_blank" href="/legal/terms-of-use.pdf">
						Terms of Use
					</a>
					<a target="_blank" href="/legal/privacy-policy.pdf">
						Privacy Policy
					</a>
				</div>
				<div>
					<h4>Legal</h4>
					<a target="_blank" href="/legal/terms-and-conditions.pdf">
						Terms & Conditions
					</a>
					<a target="_blank" href="/legal/nerds-terms-and-conditions.pdf">
						Nerds Terms & Conditions
					</a>
				</div>
				<div>
					<h4>Community</h4>
					<NuxtLink to="/nerds/signup">
						Become a Nerd
					</NuxtLink>
					<NuxtLink to="/">
						Blog
					</NuxtLink>
					<a target="_blank">
						Honor Code
					</a>
				</div>
				<div>
					<h4>Help</h4>
					<NuxtLink to="/">
						FAQs
					</NuxtLink>
					<NuxtLink to="/contact-us">
						Contact Us
					</NuxtLink>
				</div>
			</div>
			<p>
				&copy; {{ new Date().getFullYear() }} | Stranerd LLC. All Rights Reserved.
			</p>
		</div>
	</footer>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HomeBottomNavigation'
})
</script>

<style lang="scss" scoped>
footer {
	padding: 2rem 1rem;
	@media (min-width: $md) { padding: 2.5rem; }
	@media (min-width: $lg) { padding: 5rem; }
	background: $color-footer-blue;
	color: $color-blue-white;
}
.content {
	max-width: 1600px;
	margin: 0 auto;
	.links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 2rem 1rem;
		@media (min-width: $lg) {
			grid-template-columns: repeat(4, 1fr);
		}
		h4 {
			font-weight: 600;
			font-size: 1.125rem;
			@media (min-width: $md) { font-size: 1.875rem; }
			i { font-size: 16px; }
		}
		a {
			display: block;
			margin: 0.5rem 0;
			font-size: 0.875rem;
			@media (min-width: $md) { font-size: 1.5rem; }
		}
	}
	p {
		margin: 2rem 0 0;
		font-size: 0.875rem;
		@media (min-width: $md) { font-size: 1.5rem; }
	}
}
</style>
