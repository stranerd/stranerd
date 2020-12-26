<template>
	<div :id="challenge.id">
		<div class="d-flex align-items-center">
			<div class="d-flex flex-column mr-1">
				<span class="text-capitalize mr-1 text-wrap">
					{{ challenge.description }}
				</span>
				<span class="d-flex align-items-center">
					<span>+{{ challenge.reward }}</span>
					<Credits :size="16" />
				</span>
			</div>
			<span class="ml-auto flex-no-wrap d-flex align-items-center">
				<i class="fas fa-clock" style="margin-right: 2px;" />
				<span class="small text-nowrap">{{ time }}</span>
			</span>
			<button v-if="!currentChallenge" class="ml-1 btn btn-small rounded-pill btn-accent text-white px-2 py-0" @click="start">
				Start
			</button>
		</div>
		<DisplayError :error="error" />
		<DisplayError :error="rError" />
		<PageLoading v-if="loading" />
		<PageLoading v-if="rLoading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity, PersonalChallengeEntity } from '@modules/challenges'
import { useRetryPersonalChallenge, useStartPersonalChallenge } from '@app/hooks/challenges/personal-challenges'
import { useAuth } from '@app/hooks/auth/auth'
import { getTimeFormatted } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'StartChallengeCard',
	props: {
		challenge: {
			type: Object as PropType<ChallengeEntity>,
			required: true
		},
		personalChallenges: {
			type: Array as PropType<PersonalChallengeEntity[]>,
			required: false,
			default: () => []
		}
	},
	setup (props) {
		const { currentChallenge } = useAuth()
		const { error, loading, startChallenge } = useStartPersonalChallenge()
		const { error: rError, loading: rLoading, retryChallenge } = useRetryPersonalChallenge()
		const time = getTimeFormatted(props.challenge.time * 60 * 60)
		const failed = computed({
			get: () => props.personalChallenges.find((p) => p.clone.id === props.challenge.id) ?? null,
			set: () => {}
		})
		const start = () => failed.value ? retryChallenge(failed.value) : startChallenge(props.challenge)
		return {
			error, loading, rError, rLoading,
			start, currentChallenge, time,
			failed
		}
	}
})
</script>
