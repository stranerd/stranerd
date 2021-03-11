<template>
	<div>
		<PageLoading v-if="loading" />
		<div v-else-if="user" class="page-content">
			<UserHeadCard :user="user" />
			<DisplayError v-if="error" :error="error" />
			<div class="thick mx-n4" />
			<UserAnswerList v-if="user.roles.isTutor" :user-id="user.id" />
			<UserQuestionList v-else :user-id="user.id" />
		</div>
		<div v-else class="page-content">
			<DisplayError error="No such user exists!" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import UserHeadCard from '@app/components/users/user/UserHeadCard.vue'
import UserQuestionList from '@app/components/questions/questions/UserQuestionsList.vue'
import UserAnswerList from '@app/components/questions/answers/UserAnswersList.vue'
export default defineComponent({
	name: 'UserPage',
	components: { UserHeadCard, UserQuestionList, UserAnswerList },
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
