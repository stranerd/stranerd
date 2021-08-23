<template>
	<Modal :modal="$attrs.modal" :hide-separator="true">
		<template slot="title">
			Ask Your Question
		</template>
		<QuestionForm
			:submit="createQuestion"
			:loading="loading"
			:factory="factory"
			:error="error"
			:coins="coins"
		>
			<template slot="buttonText">
				Post Question
			</template>
		</QuestionForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, useMeta } from '@nuxtjs/composition-api'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/hooks/questions/questions'
import { analytics } from '@modules/core'
export default defineComponent({
	name: 'QuestionCreatePage',
	components: { QuestionForm },
	layout: 'justified',
	middleware: ['isAuthenticated'],
	setup () {
		const { loading, createQuestion, factory, error, coins } = useCreateQuestion()
		onMounted(() => {
			analytics.logEvent('ask_question_start')
		})
		useMeta({
			title: 'Ask a Question | Stranerd'
		})
		return { loading, createQuestion, factory, error, coins }
	},
	head: {}
})
</script>
