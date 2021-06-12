<template>
	<Modal :close="closeCreateModal">
		<template slot="title">
			Ask Question
		</template>
		<QuestionForm :submit="createQuestion" :loading="loading" :factory="factory" :error="error" :coins="coins" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import { useCreateQuestion } from '@app/hooks/questions/questions'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { analytics } from '@modules/core/services/initFirebase'
export default defineComponent({
	name: 'CreateModalQuestion',
	components: { QuestionForm },
	setup () {
		const { closeCreateModal } = useCreateModal()
		const { loading, createQuestion, factory, error, coins } = useCreateQuestion()
		onMounted(() => {
			analytics.logEvent('ask_question_start')
		})
		return {
			loading, createQuestion, factory, error, coins,
			closeCreateModal
		}
	}
})
</script>
