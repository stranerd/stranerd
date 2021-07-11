<template>
	<nav role="navigation" class="d-flex justify-content-center align-items-center">
		<NuxtLink :to="`/users/${userId}/questions`">
			Questions
		</NuxtLink>
		<NuxtLink :to="`/users/${userId}/answers`">
			Answers
		</NuxtLink>
		<NuxtLink :to="`/users/${userId}/reviews`">
			Reviews
		</NuxtLink>
	</nav>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'UserTopNavigation',
	setup () {
		const { userId } = useRoute().value.params
		return { userId }
	}
})
</script>

<style lang="scss" scoped>
	a {
		border: 1px solid $color-line;
		padding: 0.75rem 2rem;
		font-size: 1.5rem;
	}

	.nuxt-link-exact-active {
		background: $color-primary;
		border: 1px solid $color-primary;
		color: $color-white;
	}
</style>
