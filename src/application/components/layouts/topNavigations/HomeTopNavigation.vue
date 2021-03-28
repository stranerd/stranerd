<template>
	<nav class="full-top-nav justify-content-between flex-wrap">
		<NuxtLink to="/">
			<Logo />
		</NuxtLink>
		<button class="mx-0 d-md-none navbar-toggler" type="button" @click="show = !show">
			<span class="fas fa-bars" />
		</button>
		<div class="d-none d-md-flex nav-links">
			<NuxtLink to="/">
				Home
			</NuxtLink>
			<NuxtLink to="/how-it-works">
				How it works
			</NuxtLink>
			<NuxtLink to="/contact-us">
				Contact us
			</NuxtLink>
			<NuxtLink class="btn rounded-pill btn-white" to="/auth">
				Sign in
			</NuxtLink>
		</div>
		<div v-if="show" class="d-md-none nav-links">
			<NuxtLink to="/">
				Home
			</NuxtLink>
			<NuxtLink to="/how-it-works">
				How it works
			</NuxtLink>
			<NuxtLink to="/contact-us">
				Contact us
			</NuxtLink>
			<NuxtLink class="btn rounded-pill btn-white" to="/auth">
				Sign in
			</NuxtLink>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'HomeTopNavigation',
	setup () {
		const show = ref(false)
		return { show }
	}
})
</script>

<style lang="scss" scoped>
.full-top-nav {
	max-width: 1600px;
	margin: 0 auto;
	background: unset;
	padding: 0.5rem 1rem;
}
.nav-links {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	@media (min-width: $md) {
		width: auto;
		align-items: center;
		flex-direction: row;
	}
	a {
		margin: 0.5rem 1rem 0.5rem 0;
	}
	.btn {
		padding: 0.5rem 1.5rem;
	}
	.nuxt-link-exact-active {
		border-bottom: 2px solid $color-light-blue;
	}
}
</style>
