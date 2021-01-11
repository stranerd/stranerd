<template>
	<div>
		<div class="content">
			<UserProfileCard v-if="user" :key="user.hash" :user="user" />
			<DisplayError v-else error="No such user exists!" />
			<DisplayError :error="error" />
		</div>
		<NuxtChild v-if="user" class="content" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useContext } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import UserProfileCard from '@app/components/users/user/UserProfileCard.vue'
export default defineComponent({
	name: 'UserSingleRootPage',
	components: { UserProfileCard },
	layout: 'users',
	setup () {
		const { route } = useContext()
		const { userId } = route.value.params
		const { error, loading, user, listener } = useUser(userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { error, loading, user, listener }
	}
})
</script>

<style lang="scss" scoped>
.content {
	background: $color-white;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 0.5rem;
	box-shadow: 0 0 12px rgba($color-black, 0.1);
	@media (min-width: $md) {
		padding: 1.5rem;
		margin: 1rem 0;
		border-radius: 1rem;
	}
	@media (min-width: $lg) {
		padding: 2.0rem;
		margin: 2rem 0;
		border-radius: 1.5rem;
	}
}
</style>
