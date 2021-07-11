<template>
	<section>
		<AnswersList :user-id="user.id" />
	</section>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import AnswersList from '@app/components/questions/answers/UserAnswersList.vue'
export default defineComponent({
	name: 'UserAnswersPage',
	components: { AnswersList },
	layout: 'profile',
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
