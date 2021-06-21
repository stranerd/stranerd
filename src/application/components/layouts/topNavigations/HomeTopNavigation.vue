<template>
	<nav class="full-top-nav justify-content-between flex-wrap" role="navigation">
		<!-- add  "fixed-top" class on scroll Condition(window.scrollTop() > 10) -->
		<div class="md-top-nav">
			<NuxtLink to="/">
				<Logo :secondary="true" />
			</NuxtLink>
			<button class=" d-md-none navbar-toggler" @click="show = !show">
				<span v-if="!show" class="fas fa-bars" />
				<span v-else class="fas fa-times" />
			</button>
		</div>
		<div class="d-none d-md-flex nav-links">
			<NuxtLink to="/auth" class="btn-primary-outline">
				Log In
			</NuxtLink>
			<NuxtLink to="/auth" class="btn-primary">
				Sign up
			</NuxtLink>
			<!-- <NuxtLink to="/dashboard">
				Dashboard
			</NuxtLink>
			<NuxtLink to="/how-it-works">
				How it works
			</NuxtLink>
			<NuxtLink to="/contact-us">
				Contact us
			</NuxtLink>
			<NuxtLink class="btn rounded-pill btn-white" to="/auth">
				Sign in
			</NuxtLink> -->
		</div>
		<transition name="slide" appear>
			<div v-if="show" class="d-md-none nav-links bg-dropdown ">
				<div class="d-flex justify-content-around w-100">
					<NuxtLink to="/auth" class="btn-secondary-outline mx-1 font-weight-bold">
						Log In
					</NuxtLink>
					<NuxtLink to="/auth" class="btn-secondary mx-1 font-weight-bold">
						Sign up
					</NuxtLink>
				</div>
			</div>
		</transition>
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

.md-top-nav{
	    display: flex;
    width: 100%;
	justify-content: space-between;
	 padding: 0.7rem 2rem;
	     z-index: 10;
    background: white;
	@media (min-width: $md) {  width: fit-content }
}
.bg-dropdown{
	background-color: $color-blue;
}
.fixed-top{
	background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 5px 15px #17224D26;
}
.full-top-nav {
box-shadow: 0px 5px 15px #17224D26;

	// max-width: 1600px;
	margin: 0 auto;
	padding: 0.5rem 1rem;
	@media (max-width: $md) { padding: 0; }
	@media (min-width: $lg) { padding: 0.5rem 4rem; }
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
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-60px);
}
</style>
