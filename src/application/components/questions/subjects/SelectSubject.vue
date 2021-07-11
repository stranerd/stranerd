<template>
	<select
		class="form-select"
		:value="subjectId"
		@change="$emit('update:subjectId',$event.target.value)"
	>
		<option value="" :disabled="!showAll">
			{{ showAll ? 'All Subjects' : placeholder || 'Select A Subject' }}
		</option>
		<option v-for="subject in subjects" :key="subject.hash" :value="subject.id">
			{{ subject.name }}
		</option>
	</select>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubjectList } from '@app/hooks/questions/subjects'
export default defineComponent({
	name: 'SelectSubject',
	props: {
		subjectId: {
			type: String,
			required: true
		},
		showAll: {
			type: Boolean,
			required: false,
			default: true
		},
		placeholder: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup () {
		const { subjects } = useSubjectList()
		return { subjects }
	}
})
</script>
