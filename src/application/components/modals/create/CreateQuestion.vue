<template>
	<Modal :close="closeCreateModal">
		<template slot="title">
			Ask Question
		</template>
		<QuestionForm :submit="createQuestion" :loading="loading" :factory="factory" :error="error" :coins="coins" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import { useCreateQuestion } from '@app/hooks/questions/questions'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
export default defineComponent({
	name: 'CreateModalQuestion',
	components: { QuestionForm },
	setup () {
		const { closeCreateModal } = useCreateModal()
		const { loading, createQuestion, factory, error, coins } = useCreateQuestion()
		return {
			loading, createQuestion, factory, error, coins,
			closeCreateModal
		}
	}
})
</script>
