<template>
	<nav class="home-top-nav" role="navigation">
		<!-- add  "fixed-top" class on scroll Condition(window.scrollTop() > 10) -->
		<div class="d-flex justify-content-between align-items-center padding">
			<NuxtLink to="/">
				<Logo :secondary="true" />
			</NuxtLink>
			<button class="d-md-none navbar-toggler" @click="show = !show">
				<span v-if="!show" class="fas fa-bars" />
				<span v-else class="fas fa-times" />
			</button>
			<div class="d-none d-md-flex nav-links gap-1">
				<NuxtLink to="/auth" class="btn-primary-outline">
					Log In
				</NuxtLink>
				<NuxtLink to="/auth" class="btn-primary">
					Sign up
				</NuxtLink>
			</div>
		</div>
		<transition name="slide" appear>
			<div v-if="show" class="d-md-none nav-links w-100 gap-1 p-1 slide-down bg-blue">
				<NuxtLink to="/auth" class="btn-secondary-outline font-weight-bold">
					Log In
				</NuxtLink>
				<NuxtLink to="/auth" class="btn-secondary font-weight-bold">
					Sign up
				</NuxtLink>
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
.home-top-nav {
	background:  $color-white;
	color:$color-blue;
	min-height: 60px;
	z-index: 10;

	margin: 0 auto;
	box-shadow: 0px 5px 15px #17224D26;

	button.navbar-toggler {
		border: none;
		outline: none;
		border-radius: 0;
		color: $color-tint-blue;
	}
}
.padding {
	padding: 1rem 2rem;
	@media (min-width: $md) { padding: 1.25rem 4rem; }
	@media (min-width: $lg) { padding: 1.5rem 6rem; }
}
.fixed-top{
	background: #FFFFFF 0% 0% no-repeat padding-box;
	box-shadow: 0px 5px 15px #17224D26;
}
.nav-links {
	display: flex;
	justify-content: center;
	align-items: center;
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
