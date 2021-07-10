<template>
	<form @submit.prevent="submit">
		<div class="form-group">
			<span class="title">Main Answer</span>
			<span class="sub-title">
				Write the correct answer to the question in this box. No explanations
			</span>
			<input
				v-model="factory.title"
				type="text"
				class="form-control"
				placeholder="Example: The answer is 14 seconds."
			>
			<span v-if="factory.errors.title" class="text-danger small">{{ factory.errors.title }}</span>
		</div>

		<div class="form-group">
			<span class="title">Explanation</span>
			<span class="sub-title">
				Write out the step-by-step explanation of the answer you gave above
			</span>
			<AnswerEditor :model.sync="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')" />
		</div>

		<button class="btn btn-primary-blue px-2 py-1 mt-2" type="submit" :disabled="loading || !factory.valid">
			<slot name="buttonText">
				Submit
			</slot>
		</button>
		<PageLoading v-if="loading" />
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

<style lang="scss" scoped>
	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.5rem;

		.title {
			color: $color-text-main;
			font-size: 1.5rem;
			font-weight: 600;
			margin-bottom: 8px;
		}

		.sub-title {
			color: $color-text-main;
			font-size: 1.125rem;
			font-weight: 500;
			margin-bottom: 8px;
		}

		input {
			box-sizing: border-box;
			background: $color-white;
			border: 1px solid $color-line;
			border-radius: 6px;
			padding: 16px 24px;

			&::placeholder {
				color: $color-text-main;
			}
		}
	}
</style>
