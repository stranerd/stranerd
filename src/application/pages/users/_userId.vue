<template>
	<div>
		<NuxtChild v-if="user" />
		<DisplayError v-else error="No such user exists!" />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
export default defineComponent({
	name: 'UserSingleRootPage',
	layout: 'users',
	setup () {
		const { route } = useContext()
		const { userId } = route.value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
