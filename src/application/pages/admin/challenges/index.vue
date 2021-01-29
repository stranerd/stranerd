<template>
	<div class="page-content">
		<div class="d-flex justify-content-end">
			<button class="btn btn-lg btn-blue text-white" @click="setCreateModalAnswerChallenge">
				Add New Challenge
			</button>
		</div>
		<hr class="thick mb-4">
		<ChallengesList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import ChallengesList from '@app/components/admin/challenges/AdminChallengesList.vue'
export default defineComponent({
	name: 'AdminChallengesPage',
	components: { ChallengesList },
	layout: 'admin',
	setup () {
		return { setCreateModalAnswerChallenge: useCreateModal().setCreateModalAnswerChallenge }
	}
})
</script>
