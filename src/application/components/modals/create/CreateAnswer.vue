<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Add Answer
				</h4>
				<a @click.prevent="closeCreateModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<AnswerForm :submit="createAnswer" :loading="loading" :factory="factory" :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import { useCreateAnswer } from '@app/hooks/questions/answers'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
export default defineComponent({
	name: 'CreateModalAnswer',
	components: { AnswerForm },
	setup () {
		const { closeCreateModal } = useCreateModal()
		const { loading, createAnswer, factory, error } = useCreateAnswer()
		return {
			loading, createAnswer, factory, error,
			closeCreateModal
		}
	}
})
</script>
