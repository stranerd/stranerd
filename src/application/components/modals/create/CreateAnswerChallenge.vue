<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Create Challenge
				</h4>
				<a @click.prevent="closeCreateModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<ChallengeForm :submit="createChallenge" :loading="loading" :factory="factory" :error="error">
			<template slot="buttonText">
				Create Challenge
			</template>
		</ChallengeForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import { useCreateChallenge } from '@app/hooks/challenges/challenges'
import ChallengeForm from '@app/components/admin/challenges/AnswerChallengeForm.vue'
export default defineComponent({
	name: 'CreateModalChallenge',
	components: { ChallengeForm },
	setup () {
		const { closeCreateModal } = useCreateModal()
		const { loading, createChallenge, factory, error } = useCreateChallenge()
		return {
			loading, createChallenge, factory, error,
			closeCreateModal
		}
	}
})
</script>
