<template>
	<footer class="bg-black">
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
					<h4>
						<i class="fas fa-circle me-half" />
						<i class="fas fa-circle me-half" />
						<i class="fas fa-circle me-half" />
					</h4>
					<a target="_blank" href="/legal/terms-and-conditions.pdf">
						Terms & Conditions
					</a>
					<a target="_blank" href="/legal/nerds-terms-and-conditions.pdf">
						Nerds Terms & Conditions
					</a>
				</div>
				<div>
					<h4>Community</h4>
					<NuxtLink to="/">
						Become a Nerd
					</NuxtLink>
					<NuxtLink to="/">
						Blog
					</NuxtLink>
					<NuxtLink to="/">
						Honor Code
					</NuxtLink>
				</div>
				<div>
					<h4>Help</h4>
					<NuxtLink to="/">
						FAQ
					</NuxtLink>
					<NuxtLink to="/contact-us">
						Contact Us
					</NuxtLink>
				</div>
			</div>
			<p class="my-4">
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
}
.content{
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
			font-size: 20px;
			i { font-size: 16px; }
		}
		a {
			display: block;
			margin: 0.5rem 0;
		}
	}
}
</style>
