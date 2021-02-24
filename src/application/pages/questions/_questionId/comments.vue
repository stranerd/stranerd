<template>
	<div>
		<PageLoading v-if="loading" />
		<div class="page-content">
			<QuestionCommentPageCard v-if="question" :question="question" />
			<DisplayError v-else error="Question not found" />
			<DisplayError :error="error" />
		</div>
		<div v-if="question" class="page-content">
			<h2>Comments</h2>
			<CommentsList :question-id="questionId" />
			<CommentForm v-if="isLoggedIn" id="add" :question-id="questionId" class="my-3" />
			<div v-else class="d-flex justify-content-center">
				<button class="btn btn-accent text-white px-4" @click="redirect">
					Login To Add A Comment
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useRoute } from '@nuxtjs/composition-api'
import CommentsList from '@app/components/questions/comments/QuestionCommentsList.vue'
import CommentForm from '@app/components/questions/comments/QuestionCommentForm.vue'
import QuestionCommentPageCard from '@app/components/questions/comments/QuestionCommentPageCard.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionCommentsPage',
	components: { CommentsList, CommentForm, QuestionCommentPageCard },
	layout: 'questions',
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { questionId } = useRoute().value.params
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
