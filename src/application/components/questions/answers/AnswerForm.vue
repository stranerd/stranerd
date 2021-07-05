<template>
	<form @submit.prevent="submit">
		<div class="form-group my-1">
			<AnswerEditor :model.sync="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')" />
		</div>
		<div class="d-flex justify-content-end my-1">
			<button class="btn btn-blue text-white" type="submit" :disabled="loading || !factory.valid">
				<PageLoading v-if="loading" />
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerFactory } from '@modules/questions'
import AnswerEditor from '@app/components/core/editor/AnswerEditor.vue'
export default defineComponent({
	name: 'AnswerForm',
	components: { AnswerEditor },
	props: {
		factory: {
			type: Object as PropType<AnswerFactory>,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	}
})
</script>
