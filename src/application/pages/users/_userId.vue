<template>
	<section>
		<PageLoading v-if="loading" />
		<template v-else-if="user">
			<ProfileLeftSidebar class="d-lg-none mb-3" :min="true" />
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
import ProfileLeftSidebar from '@app/components/layouts/sidebars/ProfileLeftSidebar.vue'
export default defineComponent({
	name: 'UserParentPage',
	components: { UserTopNavigation, ProfileLeftSidebar },
	layout: 'profile',
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
