<template>
	<div :id="challenge.id">
		<div class="d-flex align-items-center">
			<div class="d-flex flex-column mr-1">
				<span class="text-capitalize mr-1 mb-1 text-wrap">
					{{ challenge.description }}
				</span>
				<div class="d-flex align-items-center">
					<span class="d-none align-items-center">
						<span>+{{ challenge.reward }}</span>
						<Credits :size="16" />
					</span>
					<div class="progress ml-2">
						<div class="progress-level" :style="`width: ${100 * personal.progress / personal.clone.count}%`" />
						<span class="text">{{ personal.progress }} / {{ personal.clone.count }}</span>
					</div>
				</div>
			</div>
			<span class="ml-auto flex-no-wrap d-flex align-items-center">
				<i class="fas fa-clock" style="margin-right: 2px;" />
				<span class="small text-nowrap">{{ time }}</span>
			</span>
			<button v-if="!currentChallenge" class="ml-1 btn btn-small rounded-pill btn-red text-white px-2 py-0" @click="retry">
				Retry
			</button>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity, PersonalChallengeEntity } from '@modules/challenges'
import { useRetryPersonalChallenge } from '@app/hooks/challenges/personal-challenges'
import { useAuth } from '@app/hooks/auth/auth'
import { getTimeFormatted } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'FailedChallengeCard',
	props: {
		challenge: {
			type: Object as PropType<ChallengeEntity>,
			required: true
		},
		personalChallenges: {
			type: Array as PropType<PersonalChallengeEntity[]>,
			required: true
		}
	},
	setup (props) {
		const { currentChallenge } = useAuth()
		const { error, loading, retryChallenge } = useRetryPersonalChallenge()
		const personal = computed({
			get: () => props.personalChallenges.find((p) => p.clone.id === props.challenge.id),
			set: () => {}
		})
		const time = getTimeFormatted(props.challenge.time * 60 * 60)
		const retry = () => personal.value && retryChallenge(personal.value)
		return { error, loading, retry, currentChallenge, time, personal }
	}
})
</script>

<style lang="scss" scoped>
.progress {
	border-radius: 10rem;
	width: clamp(100px, 25%, 200px);
	position: relative;
	color: $color-black;
	display: flex;
	align-items: center;
	.progress-level {
		background: $color-red;
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
