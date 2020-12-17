<template>
	<div>
		<div class="grid my-2">
			<ChallengeCard v-for="challenge in challenges" :key="challenge.hash" :challenge="challenge" />
		</div>
		<DisplayWarning v-if="!loading && !error && challenges.length === 0" message="No challenges found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useChallengeList } from '@app/hooks/challenges/challenges'
import ChallengeCard from '@app/components/admin/questions/challenges/AdminChallengesListCard.vue'
export default defineComponent({
	name: 'AdminChallengesList',
	components: { ChallengeCard },
	layout: 'admin',
	setup () {
		const { loading, error, challenges } = useChallengeList()
		return { loading, error, challenges }
	}
})
</script>

<style lang="scss" scoped>
.grid{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 2rem;
}
@media (min-width: $sm) {
	.grid{
		grid-template-columns: repeat(3, 1fr);
	}
}
@media (min-width: $md) {
	.grid{
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>
