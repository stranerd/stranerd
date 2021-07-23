<template>
	<div class="d-flex flex-column gap-1 gap-lg-2 pb-1 border-bottom border-line">
		<div class="question-head d-flex flex-row flex-wrap align-items-center">
			<div class="d-flex align-items-center gap-0-5">
				<NuxtLink :to="`/users/${question.userId}`">
					<Avatar :src="question.avatar" :size="50" />
				</NuxtLink>
				<div class="d-flex flex-column align-items-md-center flex-md-row gap-md-0-5 fw-bold">
					<NuxtLink class="name" :to="`/users/${question.userId}`">
						<DynamicText>{{ question.userName }}</DynamicText>
					</NuxtLink>
					<div class="dot d-none d-md-inline" />
					<Subject :subject-id="question.subjectId" class="subject" />
				</div>
			</div>

			<div class="d-flex align-items-center flex-row-reverse ml-auto">
				<template v-if="question.isAnswered">
					<img src="@app/assets/images/icons/profile-best-answers.svg" alt="" style="width: 2rem; height: 2rem;">
				</template>
				<template v-else-if="showAnswerButton">
					<button class="answer-btn d-md-inline-block d-none" @click="openAnswerModal">
						Answer
					</button>
					<button class="btn btn-sm answer-btn-sm d-inline-block d-md-none" @click="openAnswerModal">
						Add Your Answer
					</button>
					<div class="coin d-flex align-items-center gap-0-25 px-1 d-md-inline-block d-none">
						<DynamicText>+{{ formatNumber(question.creditable) }}</DynamicText>
						<Coins :size="28" style="z-index: 1;" />
					</div>
				</template>
			</div>
		</div>

		<div class="question-body editor-body" v-html="question.body" />

		<div class="d-flex align-items-center flex-row flex-wrap gap-1">
			<DynamicText class="name me-auto">
				Posted {{ formatTime(question.createdAt) }}
			</DynamicText>
			<div class="d-flex align-items-center gap-0-5 mx-auto gap-md-1">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
			<div class="ms-auto d-flex align-items-center gap-1">
				<span class="d-flex align-items-center gap-0-5">
					<img src="@app/assets/images/icons/answers.svg" alt="" class="icons">
					<DynamicText>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</DynamicText>
				</span>
				<span v-if="question.userId !== id" @click="reportQuestion">
					<i class="fas fa-flag icons" />
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { openAnswerModal } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { useReportModal } from '@app/hooks/core/modals'
import { setReportedEntity } from '@app/hooks/reports/questions'
export default defineComponent({
	name: 'QuestionPageCard',
	components: { Tag, Subject },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { id, user } = useAuth()
		const router = useRouter()
		const showAnswerButton = computed({
			get: () => props.question.userId !== id.value && !props.question.isAnswered && !user.value?.meta.answeredQuestions.includes(props.question.id),
			set: () => {}
		})
		const reportQuestion = () => {
			setReportedEntity(props.question)
			useReportModal().openReportQuestion()
		}
		return {
			id, formatTime, formatNumber, pluralize, showAnswerButton,
			openAnswerModal: () => openAnswerModal(props.question, router),
			reportQuestion
		}
	}
})
</script>

<style lang="scss" scoped>
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

	.answer-btn-sm {
		background: $color-primary;
		color: $color-white;
		font-size: 13px;
		border: none;
		border-radius: 18px;
	}

	.ml-auto {
		margin-left: auto;
	}
</style>
