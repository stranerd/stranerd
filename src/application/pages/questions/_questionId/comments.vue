<template>
	<div>
		<PageLoading v-if="loading" />
		<div class="content">
			<h2 class="text-center mb-3">
				Comments
			</h2>
			<CommentCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
			<DisplayWarning v-if="comments.length === 0" message="No comments found." />
			<DisplayError :error="error" />
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
import { useQuestionCommentList } from '@app/hooks/questions/question-comments'
import CommentCard from '@app/components/questions/comments/CommentsListCard.vue'
import CommentForm from '@app/components/questions/comments/QuestionCommentForm.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'RootQuestionQuestionCommentsPage',
	components: { CommentCard, CommentForm },
	layout: 'question',
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { questionId } = useContext().route.value.params
		const { error, loading, comments, listener } = useQuestionCommentList(questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			isLoggedIn, redirect,
			questionId, error, loading, comments
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
