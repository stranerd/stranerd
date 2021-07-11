<template>
	<nav role="navigation" class="d-flex justify-content-center align-items-center">
		<NuxtLink :to="`/${link}/questions`">
			Questions
		</NuxtLink>
		<NuxtLink :to="`/${link}/answers`">
			Answers
		</NuxtLink>
		<NuxtLink :to="`/${link}/reviews`">
			Reviews
		</NuxtLink>
	</nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { UserEntity } from '@modules/users'
export default defineComponent({
	name: 'UserTopNavigation',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup (props) {
		const link = computed({
			get: () => useAuth().id.value === props.user.id ? 'account' : `users/${props.user.id}`,
			set: () => {}
		})
		return { link }
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
