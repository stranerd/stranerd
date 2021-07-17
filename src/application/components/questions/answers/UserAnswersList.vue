<template>
	<div>
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" class="border-bottom border-line" />
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a @click.prevent="fetchOlderAnswers">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && answers.length === 0" message="This user has not answered any questions yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AnswerCard from '@app/components/questions/answers/UserAnswersListCard.vue'
import { useUserAnswerList } from '@app/hooks/users/user/answers'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'UserAnswersList',
	components: { AnswerCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { answers, error, loading, hasMore, fetchOlderAnswers } = useUserAnswerList(props.userId)
		return {
			id,
			answers, error, loading, hasMore,
			fetchOlderAnswers
		}
	}
})
</script>
