<template>
	<div>
		<div class="d-flex justify-content-end">
			<button class="btn btn-lg btn-accent text-white" @click="setCreateModalAnswerChallenge">
				Add New Challenge
			</button>
		</div>
		<hr class="thick mb-4">
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminChallengesPage',
	components: {},
	layout: 'admin',
	setup () {
		return { setCreateModalAnswerChallenge: useCreateModal().setCreateModalAnswerChallenge }
	}
})
</script>
