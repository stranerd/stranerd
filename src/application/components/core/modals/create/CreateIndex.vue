<template>
	<div>
		<CreateSubject v-if="isCreateModalSubject" />
		<CreateQuestion v-if="isCreateModalQuestion" />
		<CreateAnswer v-if="isCreateModalAnswer" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import CreateSubject from '@app/components/core/modals/create/CreateSubject.vue'
import CreateQuestion from '@app/components/core/modals/create/CreateQuestion.vue'
import CreateAnswer from '@app/components/core/modals/create/CreateAnswer.vue'
export default defineComponent({
	name: 'CreateModalIndex',
	components: {
		CreateSubject,
		CreateQuestion,
		CreateAnswer
	},
	setup () {
		const { isCreateModalSubject, isCreateModalQuestion, isCreateModalAnswer } = useCreateModal()
		return { isCreateModalSubject, isCreateModalQuestion, isCreateModalAnswer }
	}
})
</script>
