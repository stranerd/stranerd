<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Ask Question
				</h4>
				<a @click.prevent="closeCreateModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
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
