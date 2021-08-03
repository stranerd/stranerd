<template>
	<div :id="answer.id" class="answer">
		<div class="border-bottom-line answer-content d-flex align-items-center gap-0-5">
			<NuxtLink :to="`/users/${answer.userId}`">
				<Avatar :src="answer.avatar" :size="40" />
			</NuxtLink>
			<NuxtLink :to="`/users/${answer.userId}`" class="d-block fw-bold text-dark text-wrap">
				<BodyText variant="large" class="text-dark">
					<DynamicText>{{ answer.userName }}</DynamicText>
				</BodyText>
			</NuxtLink>
			<ShowRatings class="ms-auto" :rating="answer.averageRating" />
		</div>
		<div class="answer-content d-flex flex-column gap-1">
			<BodyText variant="large" class="text-dark">
				<DynamicText>{{ answer.title || 'N/A' }}</DynamicText>
			</BodyText>
			<div class="d-flex gap-1 gap-md-2 align-items-center text-primary fw-bold flex-row flex-wrap">
				<span class="d-flex align-items-center gap-0-25 me-auto" @click="showExplanation = !showExplanation">
					<span>Explanation</span>
					<i class="fas" :class="showExplanation ? 'fa-angle-up' : 'fa-angle-down'" />
				</span>
				<span v-if="answer.best" class="d-flex align-items-center gap-0-25 text-success" @click.prevent="markBestAnswer">
					<span>Best answer</span>
					<i class="fas fa-check-circle" />
				</span>
				<a v-if="answer.commentsCount" class="d-flex align-items-center gap-0-25" @click.prevent="showComments = !showComments">
					<span>{{ showComments ? 'Hide' : 'Show' }} Comments</span>
					<i class="fas" :class="showComments ? 'fa-angle-up' : 'fa-angle-down'" />
				</a>
				<span v-if="isLoggedIn && question && !question.isAnswered && !answer.best && question.userId === id" class="d-flex align-items-center gap-0-25" @click.prevent="markBestAnswer">
					<span>Mark as best</span>
					<i class="fas fa-check-circle" />
				</span>
				<SelectRating v-if="showRatingButton && isLoggedIn && answer.userId !== id" :rating="0" :set-rating="rateAnswer" />
				<Share :title="answer.title" :text="answer.strippedBody" :link="`/questions/${answer.questionId}#${answer.id}`" />
				<span v-if="id && answer.userId !== id" @click="reportAnswer">
					<i class="fas fa-flag" />
				</span>
			</div>
		</div>
		<div v-if="showExplanation" class="answer-content bg-line">
			<div class="editor-body" v-html="answer.body || 'No explanation'" />
		</div>
		<div v-if="showComments && answer.commentsCount" class="answer-content">
			<CommentList :answer-id="answer.id" />
		</div>
		<div class="border-0 answer-content">
			<CommentForm :answer-id="answer.id" />
		</div>
		<DisplayError style="margin: 0 !important;" :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { useAnswer } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import CommentForm from '@app/components/questions/comments/AnswerCommentForm.vue'
import CommentList from '@app/components/questions/comments/AnswerCommentsList.vue'
import { formatTime } from '@utils/dates'
import { useReportModal } from '@app/hooks/core/modals'
import { setReportedEntity } from '@app/hooks/reports/answers'
export default defineComponent({
	name: 'AnswerListCard',
	components: {
		CommentForm,
		CommentList
	},
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		},
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const showComments = ref(false)
		const showExplanation = ref(false)
		const { id, isLoggedIn, user } = useAuth()
		const showRatingButton = computed({
			get: () => isLoggedIn.value && !user.value?.meta.ratedAnswers.includes(props.answer.id),
			set: () => {}
		})
		const { error, loading, rateAnswer, markBestAnswer } = useAnswer(props.answer)
		const reportAnswer = () => {
			setReportedEntity(props.answer)
			useReportModal().openReportAnswer()
		}
		return {
			id, isLoggedIn, user, formatTime, showComments, showExplanation,
			error, loading, rateAnswer, showRatingButton,
			markBestAnswer: () => markBestAnswer(props.question),
			reportAnswer
		}
	}
})
</script>

<style lang="scss" scoped>
	.answer {
		border: 1px solid $color-line;
		border-radius: 7px;
		border-radius: 12px;

		.answer-content {
			border-bottom: 1px solid $color-line;
			padding: 0.5rem 0.75rem;
			@media (min-width: $md) { padding: 1rem; }
		}
	}

	.icons {
		font-size: 14px;
		font-weight: 600;
	}
</style>
