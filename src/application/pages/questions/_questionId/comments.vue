<template>
	<div>
		<PageLoading v-if="loading" />
		<div class="content">
			<QuestionCommentPageCard v-if="question" :question="question" />
			<DisplayError v-else error="Question not found" />
			<DisplayError :error="error" />
		</div>
		<div v-if="question" class="content">
			<h2 class="mb-3">
				Comments
			</h2>
			<CommentsList :question-id="questionId" />
			<CommentForm v-if="isLoggedIn" :question-id="questionId" class="my-3" />
			<div v-else class="d-flex justify-content-center">
				<button class="btn btn-accent text-white" @click="redirect">
					Login To Add A Comment
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useContext } from '@nuxtjs/composition-api'
import CommentsList from '@app/components/questions/comments/QuestionCommentsList.vue'
import CommentForm from '@app/components/questions/comments/QuestionCommentForm.vue'
import QuestionCommentPageCard from '@app/components/questions/questions/QuestionCommentPageCard.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionCommentsPage',
	components: { CommentsList, CommentForm, QuestionCommentPageCard },
	layout: 'question',
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { questionId } = useContext().route.value.params
		const { question, error, loading, listener } = useQuestion(questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			isLoggedIn, redirect, questionId,
			question, error, loading
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
