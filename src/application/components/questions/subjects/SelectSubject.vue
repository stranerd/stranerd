<template>
	<select
		class="form-control text-blue-grey"
		:value="subjectId"
		@change="$emit('update:subjectId',$event.target.value)"
	>
		<option value="">
			All Subjects
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
		}
	},
	setup () {
		const { subjects } = useSubjectList()
		return { subjects }
	}
})
</script>
