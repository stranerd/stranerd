<template>
	<div :id="answer.id" class="answer">
		<div class="answer-content d-flex align-items-center bg-light-blue gap-0-5">
			<NuxtLink :to="`/users/${answer.userId}`">
				<Avatar :src="answer.avatar" :size="50" />
			</NuxtLink>
			<div>
				<NuxtLink :to="`/users/${answer.userId}`" class="d-block fw-bold text-wrap">
					<span>{{ answer.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ formatTime(answer.createdAt) }}
				</span>
			</div>
			<ShowRatings class="ms-auto" :rating="answer.averageRating" />
		</div>
		<div class="answer-content">
			<div class="my-0-5 lead editor-body" v-html="answer.body" />
			<div class="my-0-5 d-flex flex-wrap icons justify-content-end gap-0-5">
				<span v-if="answer.attachments.length">
					<span>{{ answer.attachments.length }}</span>
					<i class="fas fa-paperclip" />
				</span>
				<a v-if="answer.commentsCount" class="d-flex align-items-center" @click.prevent="showComments = !showComments">
					<span>
						{{ showComments ? 'Hide' : 'Show' }} Comments
					</span>
					<i class="fas mx-0-25" :class="showComments ? 'fa-angle-up' : 'fa-angle-down'" />
				</a>
				<span v-if="showRatingButton">
					<SelectRating v-if="isLoggedIn && answer.userId !== id" :rating="0" :set-rating="rateAnswer" />
				</span>
				<a v-if="isLoggedIn && answer.userId !== id" @click.prevent="tip">
					<span>Tip Nerd</span>
				</a>
				<a v-if="isLoggedIn && question && !question.isAnswered && question.userId === id" @click.prevent="markBestAnswer">
					<span>Mark as Best Answer</span>
					<i class="fas fa-check" />
				</a>
				<span v-if="question && question.isAnswered && answer.best" class="text-success">
					<span>Best</span>
					<i class="fas fa-check" />
				</span>
			</div>
		</div>
		<DisplayAttachments v-if="answer.attachments.length" id="attachments" :attachments="answer.attachments" class="my-0-5" />
		<div v-if="showComments">
			<div class="d-flex align-items-end my-0-5">
				<h5 class="mb-0 me-0-5">
					Comments
				</h5>
				<span>{{ answer.commentsCount }}</span>
			</div>
			<CommentList :answer-id="answer.id" />
		</div>
		<CommentForm :answer-id="answer.id" />
		<div class="my-0-5">
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { useAnswer } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
import CommentForm from '@app/components/questions/comments/AnswerCommentForm.vue'
import CommentList from '@app/components/questions/comments/AnswerCommentsList.vue'
import { formatTime } from '@utils/dates'
import { useAccountModal } from '@app/hooks/core/modals'
import { setNerdBioAndId } from '@app/hooks/users/account'
export default defineComponent({
	name: 'AnswerListCard',
	components: {
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
		const { id, isLoggedIn, user } = useAuth()
		const showRatingButton = computed({
			get: () => isLoggedIn.value && !user.value?.account.meta.ratedAnswers.includes(props.answer.id),
			set: () => {}
		})
		const tip = () => {
			setNerdBioAndId({ id: props.answer.userId, bio: props.answer.user })
			useAccountModal().openTipNerd()
		}
		const { error, loading, rateAnswer, markBestAnswer } = useAnswer(props.answer)
		return {
			id, isLoggedIn, user, formatTime, showComments, tip,
			error, loading, rateAnswer, showRatingButton,
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
