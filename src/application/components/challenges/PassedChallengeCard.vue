<template>
	<div :id="challenge.id">
		<div class="d-flex align-items-start">
			<span class="text-capitalize mr-1 text-wrap">
				{{ challenge.description }}
			</span>
			<span class="ml-auto flex-no-wrap d-flex align-items-center">
				<i class="fas fa-clock mr-quarter" />
				<span class="small text-nowrap">{{ time }}</span>
			</span>
			<span class="ml-1 d-flex align-items-center">
				<span>+{{ formatNumber(challenge.reward) }}</span>
				<Credits :size="16" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity } from '@modules/challenges'
import { getTimeFormatted } from '@app/hooks/core/dates'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'PassedChallengeCard',
	props: {
		challenge: {
			type: Object as PropType<ChallengeEntity>,
			required: true
		}
	},
	setup (props) {
		const time = getTimeFormatted(props.challenge.time * 60 * 60)
		return { time, formatNumber }
	}
})
</script>
