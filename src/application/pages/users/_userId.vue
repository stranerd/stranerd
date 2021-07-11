<template>
	<section>
		<PageLoading v-if="loading" />
		<template v-else-if="user">
			<UserTopNavigation :user="user" class="mb-2" />
			<NuxtChild />
		</template>
		<DisplayError v-else error="No such user exists!" />
	</section>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useUser } from '@app/hooks/users/user'
import UserTopNavigation from '@app/components/layouts/topNavigations/UserTopNavigation.vue'
export default defineComponent({
	name: 'UserQuestionsPage',
	components: { UserTopNavigation },
	layout: 'profile',
	middleware: [
		({ redirect, route }) => {
			const { userId } = route.params
			const { isLoggedIn, id } = useAuth()
			if (isLoggedIn.value && id.value === userId) redirect(
				route.fullPath.replace(`users/${userId}`, 'account')
			)
		}
	],
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
