<template>
	<div :id="answer.id" class="answer">
		<div class="answer-head d-flex align-items-center bg-light-blue rounded">
			<NuxtLink :to="`/users/${answer.userId}`">
				<Avatar :src="answer.avatar" :size="50" />
			</NuxtLink>
			<div class="mx-1">
				<NuxtLink :to="`/users/${answer.userId}`" class="d-block font-weight-bold text-wrap">
					<span>{{ answer.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ time }}
				</span>
			</div>
			<ShowRatings class="ml-auto my-auto" :rating="answer.ratings" />
		</div>
		<hr class="thin mx-n1 mx-md-n2">
		<div class="my-1 lead editor-body" v-html="answer.body" />
		<div class="my-1 d-flex flex-wrap icons">
			<span v-if="answer.attachments.length" class="mr-2">
				<span>{{ answer.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<NuxtLink
				class="mr-2"
				:to="`/questions/${answer.questionId}/answers/${answer.id}/comments`"
			>
				<span>{{ answer.commentsCount }}</span>
				<i class="fas fa-comments" />
			</NuxtLink>
			<span class="mr-2">
				<a v-if="isLoggedIn && answer.userId !== id" class="fas fa-heart" @click="likeAnswer" />
				<span class="text-danger">LIKES {{ answer.likes }}</span>
			</span>
			<span class="mr-1">
				<SelectRating v-if="isLoggedIn && answer.userId !== id" :rating="0" :set-rating="rateAnswer" />
				<span class="text-gold">{{ answer.formattedRating }}</span>
			</span>
			<a v-if="isLoggedIn && question && !question.isAnswered && question.userId === id" class="mr-1 text-accent" @click.prevent="markBestAnswer">
				<i class="fas fa-check" />
				<span>Mark as Best Answer</span>
			</a>
			<span v-if="question && question.isAnswered && answer.best" class="mr-1 text-accent">
				<span>Best Answer</span>
			</span>
		</div>
		<DisplayAttachments v-if="answer.attachments.length" id="attachments" :attachments="answer.attachments" />
		<hr class="thin mx-n1 mx-md-n2">
		<NuxtLink :to="`/questions/${answer.questionId}/answers/${answer.id}/comments#add`" class="text-decoration-none">
			<div class="d-flex align-items-end">
				<h5 class="mb-0 mr-1">
					Comments
				</h5>
				<span>{{ answer.commentsCount }}</span>
			</div>
			<CommentForm class="w-100" :answer-id="answer.id" />
		</NuxtLink>
		<div class="my-1">
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
import { useAnswer } from '@app/hooks/questions/answers'
import SelectRating from '@app/components/core/SelectRating.vue'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import { useAuth } from '@app/hooks/auth/auth'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
import CommentForm from '@app/components/questions/comments/AnswerCommentForm.vue'
export default defineComponent({
	name: 'AnswerListCard',
	components: {
		SelectRating,
		ShowRatings,
		DisplayAttachments,
		CommentForm
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
		const { id, isLoggedIn } = useAuth()
		const { time, startTimer, stopTimer } = useTimeDifference(props.answer.createdAt)
		const { error, loading, rateAnswer, likeAnswer, markBestAnswer } = useAnswer(props.answer)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return {
			id, isLoggedIn, time,
			error, loading, rateAnswer, likeAnswer,
			markBestAnswer: () => markBestAnswer(props.question)
		}
	}
})
</script>

<style lang="scss" scoped>
.answer {
	border-radius: 0.5rem;
	border: 2px solid $color-light-grey;
	padding: 0.5rem 0.5rem;
	margin: 0 0 2.5rem;
	@media (min-width: $md) {
		border-width: 3px;
		border-radius: 1.0rem;
		padding: 0.5rem 1rem;
	}
	@media (min-width: $lg) {
		border-radius: 1.5rem;
	}
	.answer-head {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		@media (min-width: $md) {
			padding: 0.5rem 1rem;
		}
	}
}
.icons {
	font-size: 14px;
	font-weight: 600;
}
</style>
