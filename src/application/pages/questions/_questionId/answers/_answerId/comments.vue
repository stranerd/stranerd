<template>
	<div>
		<PageLoading v-if="loading" />
		<PageLoading v-if="aLoading" />
		<template v-if="!question">
			<div class="content">
				<DisplayError error="Question not found" />
			</div>
		</template>
		<template v-else-if="!answer || answer.questionId !== question.id">
			<div class="content">
				<DisplayError error="Answer not found" />
			</div>
		</template>
		<template v-else>
			<div class="content">
				<QuestionCommentPageCard :question="question" />
				<DisplayError :error="error" />
			</div>
			<div class="content">
				<AnswerCommentPageCard :answer="answer" />
				<DisplayError :error="aError" />
			</div>
			<div class="content">
				<h2>Comments</h2>
				<CommentsList :answer-id="answerId" />
				<CommentForm v-if="isLoggedIn" id="add" :answer-id="answerId" class="my-3" />
				<div v-else class="d-flex justify-content-center">
					<button class="btn btn-accent text-white px-4" @click="redirect">
						Login To Add A Comment
					</button>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useContext } from '@nuxtjs/composition-api'
import CommentsList from '@app/components/questions/comments/AnswerCommentsList.vue'
import CommentForm from '@app/components/questions/comments/AnswerCommentForm.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import { useQuestion } from '@app/hooks/questions/questions'
import QuestionCommentPageCard from '@app/components/questions/questions/QuestionCommentPageCard.vue'
import { useAnswerById } from '@app/hooks/questions/answers'
import AnswerCommentPageCard from '@app/components/questions/answers/AnswerCommentPageCard.vue'
export default defineComponent({
	name: 'QuestionAnswerCommentsPage',
	components: { CommentsList, CommentForm, QuestionCommentPageCard, AnswerCommentPageCard },
	layout: 'question',
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { questionId, answerId } = useContext().route.value.params
		const { question, error, loading, listener } = useQuestion(questionId)
		const { answer, error: aError, loading: aLoading, listener: aListener } = useAnswerById(questionId, answerId)
		onMounted(() => {
			listener.startListener()
			aListener.startListener()
		})
		onBeforeUnmount(() => {
			listener.closeListener()
			aListener.closeListener()
		})
		return {
			isLoggedIn, redirect, answerId,
			question, error, loading,
			answer, aError, aLoading
		}
	}
})
</script>

<style lang="scss" scoped>
.content {
	background: $color-white;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 0.5rem;
	box-shadow: 0 0 12px rgba($color-black, 0.1);
	@media (min-width: $md) {
		padding: 1.5rem;
		margin: 1rem 0;
		border-radius: 1rem;
	}
	@media (min-width: $lg) {
		padding: 2.0rem;
		margin: 2rem 0;
		border-radius: 1.5rem;
	}
}
</style>
