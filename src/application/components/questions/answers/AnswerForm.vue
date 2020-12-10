<template>
	<form class="mx-2" @submit.prevent="submit">
		<div class="form-group my-3">
			<textarea
				v-model="factory.body"
				class="form-control"
				placeholder="Answer"
				rows="4"
				:class="{'is-invalid': factory.errors.body, 'is-valid': factory.isValid('body')}"
			/>
			<small v-if="factory.errors.body" class="small text-danger d-block">{{ factory.errors.body }}</small>
		</div>
		<div class="form-group my-3">
			<label class="label d-block">Attachments</label>
			<input
				ref="attachments"
				type="file"
				class="d-none"
				accept="image/*"
				multiple
				@change="catchAttachments"
			>
			<p>
				<span v-for="attachment in factory.attachments" :key="attachment.name" class="mr-1">
					<span style="margin-right:0.25rem;">{{ attachment.name }}</span>
					<a class="text-danger" @click.prevent="factory.removeAttachment(attachment)">
						<i class="fas fa-times" />
					</a>
				</span>
			</p>
			<span v-if="factory.icon">{{ factory.icon.name }}</span>
			<a class="text-info my-1" @click.prevent="() => { $refs.attachments.value= ''; $refs.attachments.click() }">
				Upload attachments
			</a>
			<small v-if="factory.errors.attachments" class="small text-danger d-block">{{ factory.errors.attachments }}</small>
		</div>
		<hr>
		<div class="d-flex justify-content-end my-3">
			<button class="btn btn-red text-white" type="submit" :disabled="loading || !factory.valid">
				<PageLoading v-if="loading" class="mr-2" />
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMultipleFileInputs } from '@app/hooks/core/forms'
import { AnswerFactory } from '@modules/questions'
export default defineComponent({
	name: 'AnswerForm',
	props: {
		factory: {
			type: AnswerFactory,
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
