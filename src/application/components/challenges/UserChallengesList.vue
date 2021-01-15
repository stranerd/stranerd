<template>
	<div class="text-grey">
		<div v-if="current" class="mb-4">
			<h5>Current Challenge</h5>
			<CurrentChallengeCard :challenge="current" />
			<hr class="thin">
		</div>
		<div v-if="newChallenges.length > 0" class="mb-4">
			<h5>New Challenges</h5>
			<hr class="thin">
			<div v-for="challenge in newChallenges" :key="challenge.hash">
				<StartChallengeCard :challenge="challenge" class="my-2" />
				<hr class="thin">
			</div>
		</div>
		<DisplayWarning v-if="!loading && !error && !current && newChallenges.length === 0" message="No new challenges found" />
		<div v-if="failedChallenges.length > 0" class="mb-4">
			<h5>Failed Challenges</h5>
			<hr class="thin">
			<div v-for="challenge in failedChallenges" :key="challenge.hash">
				<FailedChallengeCard :challenge="challenge" :personal-challenges="pChallenges" class="my-2" />
				<hr class="thin">
			</div>
		</div>
		<div v-if="passedChallenges.length > 0" class="mb-4">
			<h5>Passed Challenges</h5>
			<hr class="thin">
			<div v-for="challenge in passedChallenges" :key="challenge.hash">
				<PassedChallengeCard :challenge="challenge" class="my-2" />
				<hr class="thin">
			</div>
		</div>
		<PageLoading v-if="loading" />
		<PageLoading v-if="pLoading" />
		<DisplayError :error="error" />
		<DisplayError :error="pError" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useChallengeList } from '@app/hooks/challenges/challenges'
import StartChallengeCard from '@app/components/challenges/StartChallengeCard.vue'
import CurrentChallengeCard from '@app/components/challenges/CurrentChallengeCard.vue'
import FailedChallengeCard from '@app/components/challenges/FailedChallengeCard.vue'
import PassedChallengeCard from '@app/components/challenges/PassedChallengeCard.vue'
import { usePersonalChallengesList } from '@app/hooks/challenges/personal-challenges'
export default defineComponent({
	name: 'UserChallengesList',
	components: {
		StartChallengeCard,
		CurrentChallengeCard,
		FailedChallengeCard,
		PassedChallengeCard
	},
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { loading, error, challenges: nChallenges } = useChallengeList()
		const { loading: pLoading, error: pError, challenges: pChallenges, listener, current } = usePersonalChallengesList(props.userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const newChallenges = computed({
			get: () => nChallenges.value.filter((c) => {
				return !pChallenges.value.find((p) => p.clone.id === c.id)
			}),
			set: () => {}
		})
		const failedChallenges = computed({
			get: () => nChallenges.value.filter((c) => {
				const p = pChallenges.value.find((p) => p.clone.id === c.id)
				if (!p || p.id === current.value?.id) return false
				return p.cancelled || !p.isCompleted
			}),
			set: () => {}
		})
		const passedChallenges = computed({
			get: () => nChallenges.value.filter((c) => {
				const p = pChallenges.value.find((p) => p.clone.id === c.id)
				if (!p || p.id === current.value?.id) return false
				return p.isCompleted
			}),
			set: () => {}
		})
		return {
			loading, error,
			current, pLoading, pError, pChallenges,
			newChallenges, failedChallenges, passedChallenges
		}
	}
})
</script>
