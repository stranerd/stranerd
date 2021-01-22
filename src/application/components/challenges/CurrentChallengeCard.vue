<template>
	<div :id="challenge.id">
		<div class="d-flex align-items-start">
			<span class="text-capitalize mr-1 text-wrap">
				{{ challenge.clone.description }}
			</span>
			<span class="ml-auto flex-no-wrap d-flex align-items-center">
				<i class="fas fa-clock mr-quarter" />
				<span class="text-nowrap">{{ time }}</span>
			</span>
		</div>
		<div class="progress my-1">
			<div class="progress-level" :style="`width: ${100 * challenge.progress / challenge.clone.count}%`" />
			<span class="text">{{ challenge.progress }} / {{ challenge.clone.count }}</span>
		</div>
		<div class="d-flex align-items-center">
			<span class="mr-2">
				<span>+{{ formatNumber(challenge.clone.reward) }}</span>
				<Credits :size="16" />
			</span>
			<a class="text-red" @click="cancel">
				Cancel challenge
			</a>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { PersonalChallengeEntity } from '@modules/challenges'
import { useCountdown } from '@app/hooks/core/dates'
import { useCancelPersonalChallenge } from '@app/hooks/challenges/personal-challenges'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'CurrentChallengeCard',
	props: {
		challenge: {
			type: Object as PropType<PersonalChallengeEntity>,
			required: true
		}
	},
	setup (props) {
		const { error, loading, cancelChallenge } = useCancelPersonalChallenge()
		const cancel = () => cancelChallenge(props.challenge)
		const { time, startTimer, stopTimer } = useCountdown(props.challenge.endedAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { formatNumber, time, error, loading, cancel }
	}
})
</script>

<style lang="scss" scoped>
.progress {
	border-radius: 10rem;
	position: relative;
	color: $color-white;
	display: flex;
	align-items: center;
	.progress-level {
		background: $color-accent;
		border-radius: 10rem;
		height: 100%;
	}
	.text {
		width: 100%;
		z-index: 1;
		text-align: center;
		position: absolute;
	}
}
</style>
