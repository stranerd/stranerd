<template>
	<div>
		<div class="d-flex align-items-center">
			<div class="d-flex flex-column">
				<span class="text-capitalize mr-1 text-wrap">
					{{ challenge.description }}
				</span>
				<span class="d-flex align-items-center">
					<span>{{ challenge.reward }}</span>
					<img src="@/assets/images/icons/credits.svg" alt="" width="16" height="16">
				</span>
			</div>
			<span class="ml-auto d-flex align-items-center">
				<i class="fas fa-clock" style="margin-right: 2px;" />
				<span class="small">{{ time }}</span>
			</span>
			<button v-if="!currentChallenge" class="ml-1 btn btn-small rounded-pill btn-accent text-white px-2 py-0" @click="start">
				Start
			</button>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity } from '@modules/challenges'
import { useStartPersonalChallenge } from '@app/hooks/challenges/personal-challenges'
import { useAuth } from '@app/hooks/auth/auth'
import { useTimeString } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'StartChallengeCard',
	props: {
		challenge: {
			type: Object as PropType<ChallengeEntity>,
			required: true
		}
	},
	setup (props) {
		const { currentChallenge } = useAuth()
		const { error, loading, startChallenge } = useStartPersonalChallenge()
		const time = useTimeString(props.challenge.time)
		const start = () => startChallenge(props.challenge)
		return { error, loading, start, currentChallenge, time }
	}
})
</script>
