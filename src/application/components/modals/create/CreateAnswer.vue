<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Add Answer
		</template>
		<AnswerForm :submit="createAnswer" :loading="loading" :factory="factory" :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateAnswer } from '@app/hooks/questions/answers'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
export default defineComponent({
	name: 'CreateModalAnswer',
	components: { AnswerForm },
	setup () {
		const { loading, createAnswer, factory, error } = useCreateAnswer()
		return { loading, createAnswer, factory, error }
	}
})
</script>
