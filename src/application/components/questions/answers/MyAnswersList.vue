<template>
	<div>
		<div v-for="answer in answers" :key="answer.hash">
			<AnswerCard :answer="answer" />
			<hr class="thick">
		</div>
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a class="font-weight-bold" @click.prevent="fetchOlderAnswers">LOAD MORE</a>
		</div>
		<DisplayWarning v-if="!loading && answers.length === 0" message="You have not answered any questions yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AnswerCard from '@app/components/questions/answers/MyAnswersListCard.vue'
import { useMyAnswerList } from '@app/hooks/account/answers'
export default defineComponent({
	name: 'MyAnswersList',
	components: { AnswerCard },
	setup () {
		const { answers, error, loading, hasMore, fetchOlderAnswers } = useMyAnswerList()
		return {
			answers, error, loading, hasMore,
			fetchOlderAnswers
		}
	}
})
</script>
