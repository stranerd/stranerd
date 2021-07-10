<template>
	<div :id="answer.id" class="answer">
		<div class="border-bottom-light-grey answer-content d-flex align-items-center gap-0-5">
			<NuxtLink :to="`/users/${answer.userId}`">
				<Avatar :src="answer.avatar" :size="50" />
			</NuxtLink>
			<NuxtLink :to="`/users/${answer.userId}`" class="d-block text-blue text-wrap">
				<span>{{ answer.userName }}</span>
			</NuxtLink>
			<ShowRatings class="ms-auto" :rating="answer.averageRating" />
		</div>
		<div class="answer-content d-flex flex-column gap-1">
			<span class="lead text-blue">{{ answer.title }}</span>
			<div class="d-flex gap-1 align-items-center">
				<span class="d-flex align-items-center gap-0-25" @click="showExplanation = !showExplanation">
					<span class="fw-bold">Explanation</span>
					<i class="fas fa-caret-down" :class="showExplanation ? 'fa-caret-up' : 'fa-caret-down'" />
				</span>
				<div class="d-flex flex-row ms-auto gap-2 fw-bold">
					<a v-if="answer.commentsCount" class="d-flex align-items-center gap-0-25" @click.prevent="showComments = !showComments">
						<span>{{ showComments ? 'Hide' : 'Show' }} Comments</span>
						<i class="fas" :class="showComments ? 'fa-angle-up' : 'fa-angle-down'" />
					</a>
					<!-- TODO: add isBest indicator -->
					<span v-if="isLoggedIn && question && !question.isAnswered && question.userId === id" class="d-flex align-items-center gap-0-25" @click.prevent="markBestAnswer">
						<span>Mark as best</span>
						<i class="fas fa-check-circle" />
					</span>
					<SelectRating v-if="showRatingButton && isLoggedIn && answer.userId !== id" :rating="0" :set-rating="rateAnswer" />
					<!-- TODO: add share component -->
					<span>
						<i class="fas fa-reply" />
					</span>
					<!-- TODO: add report answer functionality -->
					<span>
						<i class="fas fa-flag" />
					</span>
				</div>
			</div>
		</div>
		<div v-if="showExplanation" class="answer-content bg-light-grey">
			<div class="editor-body" v-html="answer.body" />
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
		return {
			id, isLoggedIn, user, formatTime, showComments, showExplanation,
			error, loading, rateAnswer, showRatingButton,
			markBestAnswer: () => markBestAnswer(props.question)
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
			padding: 1rem;
		}
	}

	.icons {
		font-size: 14px;
		font-weight: 600;
	}
</style>
