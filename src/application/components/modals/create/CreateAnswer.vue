<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Add Answer
		</template>
		<AnswerForm :submit="createAnswer" :loading="loading" :factory="factory" :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useCreateAnswer } from '@app/hooks/questions/answers'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
import { analytics } from '@modules/core/services/initFirebase'
export default defineComponent({
	name: 'CreateModalAnswer',
	components: { AnswerForm },
	setup () {
		const { loading, createAnswer, factory, error, answeringQuestion } = useCreateAnswer()
		onMounted(() => {
			analytics.logEvent('answer_question_start', {
				questionId: answeringQuestion?.id,
				subject: answeringQuestion?.subjectId
			})
		})
		return { loading, createAnswer, factory, error }
	}
})
</script>
