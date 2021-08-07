<template>
	<AutoComplete
		:suggestions="subjects.map((s) => ({ search: s.name, value: s.id, title: s.name }))"
		:value="value"
		:default="def"
		:placeholder="showAll ? 'All Subjects' : placeholder"
		class="w-100"
		:class="{'showAll': showAll}"
		@update:value="update($event)"
	/>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
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
			default: 'Select a Subject'
		}
	},
	setup (_, { emit }) {
		const def = { search: '', value: '', title: 'All' }
		const value = ref(def.search)
		const { subjects } = useSubjectList()
		const update = (res: { term: string, value: string}) => {
			value.value = res.term
			emit('update:subjectId', res.value)
		}
		return { def, subjects, value, update }
	}
})
</script>

<style lang="scss" scoped>
	.showAll /deep/ input.form-control {
		background-color: inherit;
		color: $color-sub;

		&::placeholder {
			font-size: 1em !important;
			opacity: 1 !important;
		}
	}
</style>
