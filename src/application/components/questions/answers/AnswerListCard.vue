<template>
	<div :id="answer.id" class="answer">
		<div class="px-1 px-md-2 my-1 d-flex align-items-start">
			<img :src="answer.user.image.link" alt="" class="profile-image">
			<div class="mx-1">
				<span class="d-block text-red font-weight-bold text-wrap">
					{{ answer.user.name }}
				</span>
				<span class="small text-wrap">
					{{ time }}
				</span>
			</div>
		</div>
		<hr class="thick my-1">
		<div class="my-1 px-1 px-md-2">
			<p class="mb-0" v-html="answer.body" />
		</div>
		<div class="my-1 px-1 px-md-2 d-flex icons">
			<span v-if="answer.attachments.length" class="mr-1">
				<span>{{ answer.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<span v-if="answer.commentsCount" class="mr-1">
				<span>{{ answer.commentsCount }}</span>
				<i class="fas fa-envelope" />
			</span>
			<span class="mr-1">
				<i class="fas fa-heart" />
				<span class="text-danger">LIKES {{ answer.likes }}</span>
			</span>
			<span class="mr-1">
				<i class="fas fa-star" />
				<span class="text-gold">{{ answer.ratings }}</span>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { useQuestionList } from '@app/hooks/questions/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'AnswerListCard',
	props: {
		questionId: {
			required: true,
			type: String
		},
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},
	setup (props) {
		const { questions } = useQuestionList()
		const question = computed({
			get: () => questions.value.find((q) => q.id === props.questionId) ?? null,
			set: () => {}
		})
		const { time, startTimer, stopTimer } = useTimeDifference(props.answer.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { question, time }
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
