<template>
	<form @submit.prevent="submit">
		<div class="form-group">
			<BodyText class="title" variant="large">
				Main Answer
			</BodyText>
			<BodyText class="sub-title">
				Write the correct answer to the question in this box. No explanations
			</BodyText>
			<input
				v-model="factory.title"
				:class="{'is-invalid': factory.errors.title, 'is-valid': factory.isValid('title')}"
				class="form-control"
				placeholder="Example: The answer is 14 seconds."
				type="text"
			>
			<DynamicText v-if="factory.errors.title" class="text-danger small">
				{{ factory.errors.title }}
			</DynamicText>
		</div>

		<div class="form-group">
			<BodyText class="title" variant="large">
				Explanation
			</BodyText>
			<BodyText class="sub-title">
				Write out the step-by-step explanation of the answer you gave above
			</BodyText>
			<AnswerEditor :error="factory.errors.body" :model.sync="factory.body" :valid="factory.isValid('body')" />
		</div>

		<div class="form-group">
			<BodyText class="title" variant="large">
				Attachments
			</BodyText>
			<BodyText class="sub-title" variant="normal">
				Add any image, if necessary, that complements your answer
			</BodyText>
			<input
				ref="attachments"
				accept="image/*"
				class="d-none"
				multiple
				type="file"
				@change="catchAttachments"
			>
			<p v-if="factory.attachments.length" class="d-flex gap-0-5">
				<span v-for="attachment in factory.attachments" :key="attachment.name" class="mr-1">
					<span class="mr-half">{{ attachment.name }}</span>
					<a class="text-danger" @click.prevent="factory.removeAttachment(attachment)">
						<i class="fas fa-times" />
					</a>
				</span>
			</p>
			<a
				class="text-info align-self-start"
				@click.prevent="() => { $refs.attachments.value= ''; $refs.attachments.click() }"
			>
				{{ factory.attachments.length > 0 ? 'Add' : 'Upload' }} attachments
			</a>
			<DynamicText v-if="factory.errors.attachments" class="text-danger small">
				{{ factory.errors.attachments }}
			</DynamicText>
		</div>

		<button :disabled="loading || !factory.valid" class="btn btn-primary px-2 py-1" type="submit">
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
import { useMultipleFileInputs } from '@app/hooks/core/forms'

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
	},
	setup (props) {
		const { catchMultipleFiles: catchAttachments } = useMultipleFileInputs(
			(files: File[]) => files.map(props.factory.addAttachment)
		)

		return { catchAttachments }
	}
})
</script>

<style lang="scss" scoped>
	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.5rem;

		.title {
			color: $color-dark;
			font-weight: 600;
			margin-bottom: 8px;
		}

		.sub-title {
			color: $color-dark;
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
				color: $color-dark;
			}
		}
	}
</style>
