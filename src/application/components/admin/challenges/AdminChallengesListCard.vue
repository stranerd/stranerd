<template>
	<div class="d-flex flex-column align-items-center">
		<h5 class="text-capitalize">
			{{ challenge.description }}
		</h5>
		<div class="d-flex justify-content-center small flex-wrap">
			<a class="text-red" @click.prevent="deleteChallenge">
				<span>Delete</span>
				<i class="fas fa-trash" />
			</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity } from '@modules/challenges'
import { useDeleteChallenge } from '@app/hooks/challenges/challenges'
export default defineComponent({
	name: 'AdminChallengesListCard',
	props: {
		challenge: {
			type: Object as PropType<ChallengeEntity>,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deleteChallenge } = useDeleteChallenge(props.challenge)
		return { loading, error, deleteChallenge }
	}
})
</script>
