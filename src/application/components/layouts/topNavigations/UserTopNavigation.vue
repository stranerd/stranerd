<template>
	<nav role="navigation" class="d-flex justify-content-center align-items-center">
		<NuxtLink :to="`/users/${user.id}/questions`">
			Questions
		</NuxtLink>
		<NuxtLink :to="`/users/${user.id}/answers`">
			Answers
		</NuxtLink>
		<NuxtLink :to="`/users/${user.id}/reviews`">
			Reviews
		</NuxtLink>
	</nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
export default defineComponent({
	name: 'UserTopNavigation',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
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
