<template>
	<div>
		<h2>Subjects</h2>
		<BaseLink to="/admin/">
			Dashboard
		</BaseLink>
		Loading: {{ loading }}
		Error: {{ error }}
		Subjects: {{ subjects }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubjectList } from '@app/usecases/courses/subjects'
export default defineComponent({
	layout: 'admin',
	setup () {
		const { loading, error, subjects } = useSubjectList()
		return { loading, error, subjects }
	}
})
</script>
