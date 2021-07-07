<template>
	<div>
		<PageLoading v-if="loading" />
		<div v-else-if="user" class="page-content">
			<UserHeadCard :key="user.hash" :user="user" />
			<DisplayError v-if="error" :error="error" />
			<div class="thick mx-n2" />
			<UserQuestionList class="mb-1" :user-id="user.id" />
			<UserAnswerList :user-id="user.id" />
		</div>
		<div v-else class="page-content">
			<DisplayError error="No such user exists!" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useUser } from '@app/hooks/users/user'
import UserHeadCard from '@app/components/users/user/UserHeadCard.vue'
import UserQuestionList from '@app/components/questions/questions/UserQuestionsList.vue'
import UserAnswerList from '@app/components/questions/answers/UserAnswersList.vue'
export default defineComponent({
	name: 'UserPage',
	components: { UserHeadCard, UserQuestionList, UserAnswerList },
	middleware: [
		({ redirect, route }) => {
			const { userId } = route.params
			const { isLoggedIn, id } = useAuth()
			if (isLoggedIn.value && id.value === userId) redirect('/account')
		}
	],
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
