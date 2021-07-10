<template>
	<div class="d-flex flex-column pb-1 pb-lg-2 gap-1 gap-lg-2 bl">
		<div class="question-head d-flex align-items-center gap-1">
			<div class="d-flex align-items-center gap-0-5 me-auto">
				<NuxtLink :to="`/users/${question.userId}`">
					<Avatar :src="question.avatar" :size="36" />
				</NuxtLink>
				<NuxtLink class="name" :to="`/users/${question.userId}`">
					{{ question.userName }}
				</NuxtLink>
				<div class="dot" />
				<span class="subject">{{ subject ? subject.name : 'Subject' }}</span>
			</div>
			<img v-if="question.isAnswered" src="@app/assets/images/icons/profile-best-answers.svg" alt="" style="width: 2rem; height: 2rem;">
			<div v-else-if="showAnswerButton" class="d-flex align-items-center gap-1">
				<div class="coin d-flex align-items-center gap-0-25">
					<span>+{{ formatNumber(question.creditable) }}</span>
					<Coins :size="28" style="z-index: 1;" />
				</div>
				<button class="answer-btn" @click="openAnswerModal">
					Answer
				</button>
			</div>
		</div>

		<div class="question-body editor-body" v-html="question.body" />

		<div class="d-flex align-items-center gap-2">
			<span class="name">Posted {{ formatTime(question.createdAt) }}</span>
			<div class="gap-0-75 d-flex align-items-center">
				<TagListCard v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
			<div class="ms-auto d-flex align-items-center gap-1">
				<span class="d-none align-items-center gap-0-5">
					<img src="@app/assets/images/icons/answers.svg" alt="" class="icons">
					<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
				</span>
				<!-- TODO: add report question functionality -->
				<i class="fas fa-flag icons" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { openAnswerModal } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import TagListCard from '@app/components/questions/tags/TagListCard.vue'
export default defineComponent({
	name: 'QuestionPageCard',
	components: { TagListCard },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { id, user } = useAuth()
		const router = useRouter()
		const { subject } = useSubject(props.question.subjectId)
		const showAnswerButton = computed({
			get: () => props.question.userId !== id.value && !props.question.isAnswered && !user.value?.meta.answeredQuestions.includes(props.question.id),
			set: () => {}
		})
		return {
			id, subject, formatTime, formatNumber, pluralize, showAnswerButton,
			openAnswerModal: () => openAnswerModal(props.question, router)
		}
	}
})
</script>

<style lang="scss" scoped>
	.bl {
		border-bottom: 1px solid $color-line;
	}

	.question-body {
		font-size: 20px;
	}

	.question-head {
		.dot {
			width: 6px;
			height: 6px;
			background-color: $color-sub;
			margin: 0 12px 0 3px;
			border-radius: 50px;
		}

		.name {
			color: $color-dark;
			font-size: 18px;
			font-weight: 600;
		}

		.subject {
			color: $color-sub;
			font-weight: 600;
		}
	}

	.icons {
		width: 20px;
	}

	.answer-btn {
		background: $color-primary;
		color: $color-white;
		border: none;
		border-radius: 18px;
		width: fit-content;
		padding: 9px 27px;

		&:hover {
			color: $color-white;
			transform: scale(1.1);
			transition: 0.5s;
		}
	}
</style>
