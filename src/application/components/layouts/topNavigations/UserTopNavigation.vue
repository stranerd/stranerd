<template>
	<nav role="navigation" class="d-flex justify-content-center align-items-center">
		<NuxtLink :to="`/users/${user.id}/questions`" class="px-1 py-1 ">
			Questions
		</NuxtLink>
		<NuxtLink :to="`/users/${user.id}/answers`" class="px-1 py-1">
			Answers
		</NuxtLink>
		<NuxtLink v-if="user.isScholar" :to="`/users/${user.id}/reviews`" class="px-1 py-1">
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
	}

	.nuxt-link-exact-active {
		background: $color-primary;
		border: 1px solid $color-primary;
		color: $color-white;
	}
</style>
