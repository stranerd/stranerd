<template>
	<div>
		<div class="d-flex flex-column gap-1 gap-lg-2 mb-1-5 mb-md-2-5">
			<Heading variant="1" class="color-dark">
				Question
			</Heading>
			<BodyText variant="large">
				<div class="mb-0-5 editor-body" v-html="question.body" />
			</BodyText>
			<div class="gap-0-5 d-flex align-items-center flex-row flex-wrap">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
		</div>
		<div class="answer-body p-md-3 p-1">
			<Heading variant="2" class="mb-0-5">
				Edit Your Answer
			</Heading>

			<AnswerForm
				:submit="editAnswer"
				:loading="loading"
				:factory="factory"
				:error="error"
			>
				<template slot="buttonText">
					Edit Answer
				</template>
			</AnswerForm>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useMeta, useRoute } from '@nuxtjs/composition-api'
import { useEditAnswer, getEditingAnswer } from '@app/hooks/questions/answers'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
import Tag from '@app/components/questions/tags/Tag.vue'
import { analytics } from '@modules/core'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'QuestionPageAnswerEditPage',
	components: { AnswerForm, Tag },
	middleware: [
		'isAuthenticated',
		({ redirect, route }) => {
			const { id } = useAuth()
			const { questionId = '' } = route.params
			const edit = getEditingAnswer()
			if (!edit) return redirect(`/questions/${questionId}`)
			const canEditAnswer = edit.answer.userId === id.value && edit.answer.canBeEdited
			if (!canEditAnswer) return redirect(`/questions/${edit.question.id}`)
		}
	],
	setup () {
		const { answerId } = useRoute().value.params
		const { loading, editAnswer, factory, error, answeringQuestion } = useEditAnswer(answerId)
		onMounted(() => {
			analytics.logEvent('answer_question_start', {
				questionId: answeringQuestion?.id,
				answerId,
				subject: answeringQuestion?.subjectId
			})
		})
		useMeta(() => ({
			title: 'Edit An Answer | Stranerd'
		}))
		return { loading, editAnswer, factory, error, question: getEditingAnswer()?.question }
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.answer-body {
		background: $color-tags;
		border: 1px solid $color-line;
	}
</style>
