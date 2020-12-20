<template>
	<div>
		<div class="d-flex align-items-center">
			<div class="d-flex flex-column">
				<span class="text-capitalize mr-1 text-wrap">
					{{ challenge.clone.description }}
				</span>
				<span class="d-flex align-items-center">
					<span>{{ challenge.clone.reward }}</span>
					<img src="@/assets/images/icons/credits.svg" alt="" width="16" height="16">
				</span>
			</div>
			<span class="ml-auto d-flex align-items-center">
				<i class="fas fa-clock" style="margin-right: 2px;" />
				<span>{{ time }}</span>
			</span>
			<div class="progress ml-1">
				<div class="progress-level" :style="`width: ${100 * challenge.progress / challenge.clone.count}%`" />
				<span class="text">
					<span>{{ challenge.progress }}</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { PersonalChallengeEntity } from '@modules/challenges'
import { useCountdown } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'CurrentChallengeCard',
	props: {
		challenge: {
			type: Object as PropType<PersonalChallengeEntity>,
			required: true
		}
	},
	setup (props) {
		const { time, startTimer, stopTimer } = useCountdown(props.challenge.endedAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { time }
	}
})
</script>

<style lang="scss" scoped>
.progress {
	border-radius: 10rem;
	width: clamp(60px, 25%, 150px);
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
