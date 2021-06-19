<template>
	<form @submit.prevent="submit">
		<div class="form-group my-1">
			<QuestionEditor :model.sync="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')" />
		</div>
		<div class="form-group d-flex flex-column flex-sm-row gap-0-5">
			<SelectSubject class="form-select-sm" :show-all="false" :subject-id.sync="factory.subjectId" />
			<select v-model="factory.coins" class="form-select form-select-sm">
				<option disabled value="0">
					Select coins
				</option>
				<option v-for="coin in coins" :key="coin" :value="coin">
					{{ coin }}
				</option>
			</select>
		</div>
		<div class="my-0-5 text-end">
			<span>Out of coins?&nbsp;</span>
			<a class="fw-bold text-decoration-underline" @click="openBuyCoins">Buy more coins</a>
		</div>
		<div class="form-group my-1">
			<label class="label d-block">Attachments</label>
			<input
				ref="attachments"
				type="file"
				class="d-none"
				accept="image/*"
				multiple
				@change="catchAttachments"
			>
			<p class="mb-0">
				<span v-for="attachment in factory.attachments" :key="attachment.name" class="me-0-5">
					<span class="me-0-25">{{ attachment.name }}</span>
					<a class="text-danger" @click.prevent="factory.removeAttachment(attachment)">
						<i class="fas fa-times" />
					</a>
				</span>
			</p>
			<span v-if="factory.icon">{{ factory.icon.name }}</span>
			<a class="text-info my-0-5" @click.prevent="() => { $refs.attachments.value= ''; $refs.attachments.click() }">
				{{ factory.attachments.length > 0 ? 'Add' : 'Upload' }} attachments
			</a>
			<small v-if="factory.errors.attachments" class="small text-danger d-block">{{ factory.errors.attachments }}</small>
		</div>
		<hr>
		<div class="d-flex justify-content-end my-1-5">
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
import { useMultipleFileInputs } from '@app/hooks/core/forms'
import { QuestionFactory } from '@modules/questions'
import QuestionEditor from '@app/components/core/editor/QuestionEditor.vue'
import { useAccountModal } from '@app/hooks/core/modals'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
export default defineComponent({
	name: 'QuestionForm',
	components: { QuestionEditor, SelectSubject },
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
		const { catchMultipleFiles: catchAttachments } = useMultipleFileInputs(
			(files: File[]) => files.map(props.factory.addAttachment)
		)
		const { openBuyCoins } = useAccountModal()
		return { catchAttachments, openBuyCoins }
	}
})
</script>
