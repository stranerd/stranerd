<template>
	<div :id="answer.id" class="answer">
		<div class="answer-content d-flex align-items-center bg-light-blue">
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
		<div class="answer-content">
			<div class="my-1 lead editor-body" v-html="answer.body" />
			<div class="my-1 d-flex flex-wrap icons justify-content-end">
				<span v-if="answer.attachments.length" class="mr-2">
					<span>{{ answer.attachments.length }}</span>
					<i class="fas fa-paperclip" />
				</span>
				<a v-if="answer.commentsCount" class="mr-2 d-flex align-items-center" @click.prevent="showComments = !showComments">
					<span>
						{{ showComments ? 'Hide' : 'Show' }} Comments
					</span>
					<i class="fas mx-half" :class="showComments ? 'fa-angle-up' : 'fa-angle-down'" />
				</a>
				<span class="mr-2">
					<a v-if="isLoggedIn && answer.userId !== id" class="fas fa-heart" @click="likeAnswer" />
					<span class="text-red">LIKES: {{ answer.likes }}</span>
				</span>
				<span class="mr-1">
					<SelectRating v-if="isLoggedIn && answer.userId !== id" :rating="0" :set-rating="rateAnswer" />
					<span class="text-gold">{{ answer.formattedRating }}</span>
				</span>
				<a v-if="isLoggedIn && question && !question.isAnswered && question.userId === id" class="mr-1 text-grey" @click.prevent="markBestAnswer">
					<i class="fas fa-check" />
					<span>Mark as Best Answer</span>
				</a>
				<span v-if="question && question.isAnswered && answer.best" class="mr-1 text-accent">
					<span>best</span>
					<i class="fas fa-check text-green" />
				</span>
			</div>
		</div>
		<DisplayAttachments v-if="answer.attachments.length" id="attachments" :attachments="answer.attachments" class="my-1" />
		<div v-if="showComments">
			<div class="d-flex align-items-end my-1">
				<h5 class="mb-0 mr-1">
					Comments
				</h5>
				<span>{{ answer.commentsCount }}</span>
			</div>
			<CommentList :answer-id="answer.id" />
		</div>
		<CommentForm :answer-id="answer.id" />
		<div class="my-1">
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from '@nuxtjs/composition-api'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
import { useAnswer } from '@app/hooks/questions/answers'
import SelectRating from '@app/components/core/SelectRating.vue'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import { useAuth } from '@app/hooks/auth/auth'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
import CommentForm from '@app/components/questions/comments/AnswerCommentForm.vue'
import CommentList from '@app/components/questions/comments/AnswerCommentsList.vue'
export default defineComponent({
	name: 'AnswerListCard',
	components: {
		SelectRating,
		ShowRatings,
		DisplayAttachments,
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
		const { id, isLoggedIn } = useAuth()
		const { time, startTimer, stopTimer } = useTimeDifference(props.answer.createdAt)
		const { error, loading, rateAnswer, likeAnswer, markBestAnswer } = useAnswer(props.answer)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return {
			id, isLoggedIn, time, showComments,
			error, loading, rateAnswer, likeAnswer,
			markBestAnswer: () => markBestAnswer(props.question)
		}
	}
})
</script>

<style lang="scss" scoped>
.answer {
	margin-bottom: 2rem;
	@media (min-width: $md) {
		margin-bottom: 3rem;
	}
	@media (min-width: $lg) {
		margin-bottom: 4rem;
	}
	.answer-content {
		border: 1px solid lighten($color-blue, 30);
		border-radius: 1rem;
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
