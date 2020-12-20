<template>
	<div>
		<div class="d-flex align-items-center">
			<span class="text-capitalize mr-1 text-wrap">
				{{ challenge.description }}
			</span>
			<span class="ml-auto d-flex align-items-center">
				<i class="fas fa-clock" style="margin-right: 2px;" />
				<span class="small">{{ time }}</span>
			</span>
			<span class="ml-1 d-flex align-items-center">
				<span>+{{ challenge.reward }}</span>
				<img src="@/assets/images/icons/credits.svg" alt="" width="16" height="16">
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity } from '@modules/challenges'
import { getTimeFormatted } from '@app/hooks/core/dates'
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
		return { time }
	}
})
</script>
