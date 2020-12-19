<template>
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
		<span class="ml-auto d-flex align-items-center mr-1">
			<i class="fas fa-clock" style="margin-right: 2px;" />
			<span>{{ challenge.time }}</span>
		</span>
		<div v-if="!attempted">
			<button class="btn btn-small rounded-pill btn-accent text-white px-2 py-0">
				Start
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChallengeEntity, PersonalChallengeEntity } from '@modules/challenges'
export default defineComponent({
	name: 'ChallengesListCard',
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
		const attempted = computed({
			get: () => props.personalChallenges.find((c) => c.clone.id === props.challenge.id) ?? null,
			set: () => {}
		})
		return { attempted }
	}
})
</script>
