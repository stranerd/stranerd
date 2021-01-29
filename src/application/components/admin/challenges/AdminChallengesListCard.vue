<template>
	<div :id="challenge.id">
		<p class="text-capitalize mb-1">
			{{ challenge.description }}
		</p>
		<div class="d-flex flex-wrap">
			<span class="d-flex align-items-center">
				<span>+{{ formatNumber(challenge.reward) }}</span>
				<Coins :size="16" />
			</span>
			<span class="mx-1">x{{ challenge.count }}</span>
			<span class="mx-1 d-flex align-items-center">
				<i class="fas fa-clock" />
				<span>{{ time }}</span>
			</span>
			<a class="text-red ml-auto" @click.prevent="deleteChallenge">
				<span>Delete</span>
				<i class="fas fa-trash" />
			</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
		<hr class="thin">
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity } from '@modules/challenges'
import { useDeleteChallenge } from '@app/hooks/challenges/challenges'
import { getTimeFormatted } from '@app/hooks/core/dates'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'AdminChallengesListCard',
	props: {
		challenge: {
			type: Object as PropType<ChallengeEntity>,
			required: true
		}
	},
	setup (props) {
		const time = getTimeFormatted(props.challenge.time * 60 * 60)
		const { loading, error, deleteChallenge } = useDeleteChallenge(props.challenge)
		return { formatNumber, time, loading, error, deleteChallenge }
	}
})
</script>
