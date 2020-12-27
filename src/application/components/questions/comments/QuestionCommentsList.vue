<template>
	<div>
		<PageLoading v-if="loading" />
		<CommentCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
		<DisplayWarning v-if="!loading && !error && comments.length === 0" message="No comments found." />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useQuestionCommentList } from '@app/hooks/questions/question-comments'
import CommentCard from '@app/components/questions/comments/CommentsListCard.vue'
export default defineComponent({
	name: 'QuestionCommentsList',
	components: { CommentCard },
	props: {
		questionId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { error, loading, comments, listener } = useQuestionCommentList(props.questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			error, loading, comments
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
