<template>
	<div>
		<div v-for="answer in answers" :key="answer.hash">
			<AnswerCard :answer="answer" />
			<hr class="thick">
		</div>
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a class="font-weight-bold" @click.prevent="fetchOlderAnswers">LOAD MORE</a>
		</div>
		<DisplayWarning v-if="!loading && !error && answers.length === 0" message="You have not answered any questions yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AnswerCard from '@app/components/questions/answers/UserAnswersListCard.vue'
import { useUserAnswerList } from '@app/hooks/users/user/answers'
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
		const { answers, error, loading, hasMore, fetchOlderAnswers } = useUserAnswerList(props.userId)
		return {
			answers, error, loading, hasMore,
			fetchOlderAnswers
		}
	}
})
</script>
