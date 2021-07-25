<template>
	<section>
		<PageLoading v-if="loading" />
		<template v-else-if="user">
			<UserTopNavigation :user="user" class="mb-1 mb-md-2" />
			<NuxtChild />
		</template>
		<DisplayError v-else error="No such user exists!" />
	</section>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import UserTopNavigation from '@app/components/layouts/topNavigations/UserTopNavigation.vue'
export default defineComponent({
	name: 'UserParentPage',
	components: { UserTopNavigation },
	layout: 'profile',
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
