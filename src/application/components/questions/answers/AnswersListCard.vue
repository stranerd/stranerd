<template>
	<div :id="answer.id" class="answer">
		<div class="px-1 px-md-2 d-flex align-items-start my-1">
			<img :src="answer.user.image.link" alt="" class="profile-image">
			<div class="mx-1">
				<span class="d-block text-red font-weight-bold text-wrap">
					{{ answer.user.name }}
				</span>
				<span class="small text-wrap">
					{{ time }}
				</span>
			</div>
			<ShowRatings class="ml-auto my-auto" :rating="answer.ratings" />
		</div>
		<hr class="thick my-1">
		<div class="my-1 px-1 px-md-2 lead">
			<p class="mb-0" v-html="answer.body" />
		</div>
		<div class="my-1 px-1 px-md-2 d-flex flex-wrap icons">
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
			<a v-if="answer.userId !== id" class="mr-2" @click="likeAnswer">
				<i class="fas fa-heart" />
				<span class="text-danger">LIKES {{ answer.likes }}</span>
			</a>
			<span v-if="answer.userId !== id" class="mr-1">
				<SelectRating :rating="0" :set-rating="rateAnswer" />
				<span class="text-gold">{{ answer.formattedRating }}</span>
			</span>
			<a v-if="!question.isAnswered && question.userId === id" class="mr-1 text-accent" @click.prevent="markBestAnswer">
				<i class="fas fa-check" />
				<span>Mark Best Answer</span>
			</a>
			<span v-if="question.isAnswered && answer.best" class="mr-1 text-accent">
				<span>Best Answer</span>
			</span>
		</div>
		<div class="my-1 px-1 px-md-2 small d-flex flex-column align-items-start">
			<NuxtLink
				v-for="comment in answer.comments"
				:id="comment.id"
				:key="comment.id"
				class="ml-2"
				:to="`/questions/${answer.questionId}/answers/${answer.id}/comments#${comment.id}`"
			>
				{{ comment.body }}
			</NuxtLink>
			<NuxtLink class="ml-2 text-red" :to="`/questions/${answer.questionId}/answers/${answer.id}/comments#add`">
				+ Add Comment
			</NuxtLink>
		</div>
		<div class="my-1 px-1 px-md-2">
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { useQuestionList } from '@app/hooks/questions/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
import { useAnswer } from '@app/hooks/questions/answers'
import SelectRating from '@app/components/core/SelectRating.vue'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AnswerListCard',
	components: {
		SelectRating,
		ShowRatings
	},
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { questions } = useQuestionList()
		const question = computed({
			get: () => questions.value.find((q) => q.id === props.answer.questionId) ?? null,
			set: () => {}
		})
		const { time, startTimer, stopTimer } = useTimeDifference(props.answer.createdAt)
		const { error, loading, rateAnswer, likeAnswer, markBestAnswer } = useAnswer(props.answer)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return {
			id,
			question, time,
			error, loading, rateAnswer, likeAnswer,
			markBestAnswer: () => markBestAnswer(question.value)
		}
	}
})
</script>

<style lang="scss" scoped>
.answer {
	border-radius: 0.5rem;
	border: 3px solid $color-light-grey;
	margin: 0 0 1rem;
	@media (min-width: $md) {
		border-radius: 1.0rem;
	}
	@media (min-width: $lg) {
		border-radius: 1.5rem;
	}
}
.icons {
	font-size: 14px;
	font-weight: 600;
}
</style>