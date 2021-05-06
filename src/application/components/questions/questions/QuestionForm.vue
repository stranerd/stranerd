<template>
	<form @submit.prevent="submit">
		<div class="form-group my-2">
			<QuestionEditor :model.sync="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')" />
		</div>
		<div class="form-group d-flex flex-column flex-sm-row">
			<select v-model="factory.subjectId" class="form-select form-select-sm my-1 mx-sm-1">
				<option disabled value="">
					Select a subject
				</option>
				<option v-for="subject in subjects" :key="subject.hash" :value="subject.id">
					{{ subject.name }}
				</option>
			</select>
			<select v-model="factory.coins" class="form-select form-select-sm my-1 mx-sm-1">
				<option disabled value="0">
					Select coins
				</option>
				<option v-for="coin in coins" :key="coin" :value="coin">
					{{ coin }}
				</option>
			</select>
		</div>
		<div class="form-group my-2">
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
				<span v-for="attachment in factory.attachments" :key="attachment.name" class="me-1">
					<span class="me-half">{{ attachment.name }}</span>
					<a class="text-danger" @click.prevent="factory.removeAttachment(attachment)">
						<i class="fas fa-times" />
					</a>
				</span>
			</p>
			<span v-if="factory.icon">{{ factory.icon.name }}</span>
			<a class="text-info my-1" @click.prevent="() => { $refs.attachments.value= ''; $refs.attachments.click() }">
				{{ factory.attachments.length > 0 ? 'Add' : 'Upload' }} attachments
			</a>
			<small v-if="factory.errors.attachments" class="small text-danger d-block">{{ factory.errors.attachments }}</small>
		</div>
		<hr>
		<div class="d-flex justify-content-end my-3">
			<button class="btn btn-red text-white" type="submit" :disabled="loading || !factory.valid">
				<PageLoading v-if="loading" />
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
		<PageLoading v-if="subLoading" />
		<DisplayError :error="error" />
		<DisplayError :error="subError" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useMultipleFileInputs } from '@app/hooks/core/forms'
import { QuestionFactory } from '@modules/questions'
import { useSubjectList } from '@app/hooks/questions/subjects'
import QuestionEditor from '@app/components/core/editor/QuestionEditor.vue'
export default defineComponent({
	name: 'QuestionForm',
	components: { QuestionEditor },
	props: {
		factory: {
			type: Object as PropType<QuestionFactory>,
			required: true
		},
		coins: {
			type: Array,
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
		const { subjects, loading: subLoading, error: subError } = useSubjectList()
		const { catchMultipleFiles: catchAttachments } = useMultipleFileInputs(
			(files: File[]) => files.map(props.factory.addAttachment)
		)
		return {
			subjects, subLoading, subError,
			catchAttachments
		}
	}
})
</script>
