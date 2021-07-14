<template>
	<div>
		<div class="question-body mb-2-5">
			<h1 class="mb-1">
				Question
			</h1>
			<div class="mb-0-5 editor-body" v-html="question.body" />
			<div class="gap-0-5 d-flex align-items-center flex-row flex-wrap">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
		</div>
		<div class="answer-body p-md-3 p-1">
			<h1>Give Your Answer</h1>

			<AnswerForm
				:submit="createAnswer"
				:loading="loading"
				:factory="factory"
				:error="error"
			>
				<template slot="buttonText">
					Add Answer
				</template>
			</AnswerForm>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useCreateAnswer, getAnsweringQuestion } from '@app/hooks/questions/answers'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
import Tag from '@app/components/questions/tags/Tag.vue'
import { analytics } from '@modules/core/services/initFirebase'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'QuestionPageAnswersCreatePage',
	components: { AnswerForm, Tag },
	middleware: [
		'isAuthenticated',
		({ redirect, route }) => {
			const { user, id } = useAuth()
			const { questionId = '' } = route.params
			const question = getAnsweringQuestion()
			if (!question) return redirect(`/questions/${questionId}`)
			const canAnswer = question.userId !== id.value &&
				!question.isAnswered && !user.value!.meta.answeredQuestions.includes(question.id)
			if (!canAnswer) return redirect(`/questions/${question.id}`)
		}
	],
	setup () {
		const { loading, createAnswer, factory, error, answeringQuestion } = useCreateAnswer()
		onMounted(() => {
			analytics.logEvent('answer_question_start', {
				questionId: answeringQuestion?.id,
				subject: answeringQuestion?.subjectId
			})
		})
		return { loading, createAnswer, factory, error, question: getAnsweringQuestion() }
	}
})
</script>

<style lang="scss" scoped>
	.question-body {
		.editor-body { font-size: 1.5em; }
	}

	.answer-body {
		background: $color-tags;
		border: 1px solid $color-line;
	}

	h1 {
		color: $color-dark;
		font-size: 36px;
		margin-bottom: 1.25rem;
	}
</style>
