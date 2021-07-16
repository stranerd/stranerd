<template>
	<nav class="px-2 bg-primary-dark">
		<div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1 py-0 d-flex align-items-center justify-content-center">
			<NuxtLink class="nav-link-custom" to="/admin/questions/subjects">
				<span>Subjects</span>
			</NuxtLink>
			<NuxtLink class="nav-link-custom" to="/admin/users/admins">
				<span>Admins</span>
			</NuxtLink>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'AdminTopNavigation'
})
</script>

<style lang="scss" scoped>
	.nav-link-custom {
		padding: 1rem 2rem;
		font-size: 17px;
		color: white;
	}

	a.nuxt-link-exact-active {
		font-size: 17px;
		color: white;
		background-color: $color-dark;
	}
</style>
