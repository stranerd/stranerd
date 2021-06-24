<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Edit Subject
		</template>
		<SubjectForm :submit="editSubject" :loading="loading" :factory="factory" :error="error">
			<template slot="buttonText">
				Update Subject
			</template>
		</SubjectForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useEditSubject } from '@app/hooks/questions/subjects'
import SubjectForm from '@app/components/questions/subjects/SubjectForm.vue'
export default defineComponent({
	name: 'EditModalSubject',
	components: { SubjectForm },
	setup () {
		const { loading, editSubject, factory, error } = useEditSubject()
		return { loading, editSubject, factory, error }
	}
})
</script>
