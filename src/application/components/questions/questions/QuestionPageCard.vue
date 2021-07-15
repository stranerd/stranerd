<template>
	<div class="d-flex flex-column pb-1 pb-lg-2 gap-lg-2 ">
		<div class="question-head d-flex flex-row flex-wrap align-items-center">
			<div class="d-flex align-items-center px-0 pb-1 d-md-inline-block d-none">
				<NuxtLink :to="`/users/${question.userId}`" style="margin-right: 3px;">
					<Avatar :src="question.avatar" :size="38" />
				</NuxtLink>
				<NuxtLink class="name" :to="`/users/${question.userId}`">
					{{ question.userName }}
				</NuxtLink>
				<div class="dot" />
				<Subject :subject-id="question.subjectId" class="subject" />
			</div>
			<!-- smaller screens -->
			<div class="d-flex px-0 pb-1 flex-row d-md-none align-items-center">
				<NuxtLink :to="`/users/${question.userId}`" style="margin-right: 3px;">
					<Avatar :src="question.avatar" :size="38" />
				</NuxtLink>
				<div class="ms-1 d-flex flex-column justify-content-center header">
					<NuxtLink class="name" :to="`/users/${question.userId}`">
						{{ question.userName }}
					</NuxtLink>
					<div>
						<Subject :subject-id="question.subjectId" class="subject" />
					</div>
				</div>
			</div>
			<!-- ends -->
			<div class="d-flex align-items-center px-0 pb-1 flex-row-reverse ml-auto">
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
						<span>+{{ formatNumber(question.creditable) }}</span>
						<Coins :size="28" style="z-index: 1;" />
					</div>
				</template>
			</div>
		</div>

		<div class="question-body editor-body" v-html="question.body" />

		<div class="d-flex align-items-center flex-row flex-wrap border-bottom bl mb-1 mt-1">
			<div class="col-12 px-0 py-0 d-md-none d-block d-flex flex-row">
				<div>
					<span class="name pe-1">Posted {{ formatTime(question.createdAt) }}</span>
				</div>
				<div style="margin-left:auto;">
					<i class="fas fa-flag icons" />
				</div>
			</div>
			<span class="name pe-1 d-md-inline-block d-none">Posted {{ formatTime(question.createdAt) }}</span>
			<div class="d-flex align-items-center py-1">
				<span v-for="tag in question.tags" :key="tag" class="smallPadding">
					<Tag :tag="tag" />
				</span>
			</div>
			<div class="ms-auto d-flex align-items-center gap-1  d-md-inline-block d-none">
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
import { openAnswerModal } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
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
		return {
			id, formatTime, formatNumber, pluralize, showAnswerButton,
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

	.smallPadding {
		padding-left: 4px;
	}

	.header {
		font-weight: bold;
	}
</style>
