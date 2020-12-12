<template>
	<div class="px-1">
		<PageLoading v-if="loading" />
		<div class="content">
			<h2 class="text-center mb-3">
				Comments
			</h2>
			<CommentCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
			<DisplayError v-if="comments.length === 0" error="No comments found." />
			<DisplayError :error="error" />
			<CommentForm :question-id="questionId" class="my-3" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useContext } from '@nuxtjs/composition-api'
import { useQuestionCommentList } from '@app/hooks/questions/question-comments'
import CommentCard from '@app/components/questions/comments/CommentsListCard.vue'
import CommentForm from '@app/components/questions/comments/QuestionCommentForm.vue'
export default defineComponent({
	name: 'RootQuestionQuestionCommentsPage',
	components: { CommentCard, CommentForm },
	layout: 'rootQuestionsSingle',
	setup () {
		const { questionId } = useContext().route.value.params
		const { error, loading, comments, listener } = useQuestionCommentList(questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { questionId, error, loading, comments }
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
