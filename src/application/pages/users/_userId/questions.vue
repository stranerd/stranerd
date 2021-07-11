<template>
	<section>
		<QuestionsList :user-id="user.id" />
	</section>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import QuestionsList from '@app/components/questions/questions/UserQuestionsList.vue'
export default defineComponent({
	name: 'UserQuestionsPage',
	components: { QuestionsList },
	layout: 'profile',
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
