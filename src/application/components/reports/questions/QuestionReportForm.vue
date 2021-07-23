<template>
	<form @submit.prevent="submit">
		<p>What is wrong with this question?</p>
		<div class="d-flex flex-column gap-0-5 mb-1">
			<span v-for="message in QuestionMessages" :key="message.id" class="d-flex gap-0-5 align-items-center fw-bold">
				<input v-model="factory.message" name="message" type="radio" :value="message.id">
				<DynamicText>It {{ message.body }}</DynamicText>
			</span>
		</div>
		<button class="btn btn-primary fw-bold" type="submit" :disabled="loading || !factory.valid">
			<PageLoading v-if="loading" />
			<span>Report</span>
		</button>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionReportFactory } from '@modules/reports'
import { QuestionMessages } from '@app/hooks/reports/form'
export default defineComponent({
	name: 'QuestionReportForm',
	props: {
		factory: {
			type: Object as PropType<QuestionReportFactory>,
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
	},
	setup () {
		return { QuestionMessages }
	}
})
</script>

<style lang="scss" scoped>
	input[type="radio"] {
		width: 18px;
		height: 18px;
	}
</style>
