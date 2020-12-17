<template>
	<div>
		<CreateSubject v-if="isCreateModalSubject" />
		<CreateQuestion v-if="isCreateModalQuestion" />
		<CreateAnswer v-if="isCreateModalAnswer" />
		<CreateAnswerChallenge v-if="isCreateModalAnswerChallenge" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import CreateSubject from '@app/components/modals/create/CreateSubject.vue'
import CreateQuestion from '@app/components/modals/create/CreateQuestion.vue'
import CreateAnswer from '@app/components/modals/create/CreateAnswer.vue'
import CreateAnswerChallenge from '@app/components/modals/create/CreateAnswerChallenge.vue'
export default defineComponent({
	name: 'CreateModalIndex',
	components: {
		CreateSubject,
		CreateQuestion,
		CreateAnswer,
		CreateAnswerChallenge
	},
	setup () {
		const { isCreateModalSubject, isCreateModalQuestion, isCreateModalAnswer, isCreateModalAnswerChallenge } = useCreateModal()
		return { isCreateModalSubject, isCreateModalQuestion, isCreateModalAnswer, isCreateModalAnswerChallenge }
	}
})
</script>
