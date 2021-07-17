<template>
	<form @submit.prevent="submit">
		<button class="btn btn-dark fw-bold" type="submit" :disabled="loading || !factory.valid">
			<PageLoading v-if="loading" />
			<span>Report Answer</span>
		</button>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerReportFactory } from '@modules/reports'
export default defineComponent({
	name: 'AnswerReportForm',
	props: {
		factory: {
			type: Object as PropType<AnswerReportFactory>,
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
