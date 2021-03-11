<template>
	<div class="d-flex flex-column flex-lg-row align-items-center my-1">
		<div class="d-flex align-items-center">
			<Avatar :src="user.avatar" :size="75" />
			<div class="ml-1">
				<span class="d-block text-18 font-weight-bold text-wrap">{{ user.fullName }}</span>
				<ShowRatings v-if="user.roles.isTutor" :rating="user.averageRating" />
			</div>
		</div>
		<div class="d-flex justify-content-around ml-lg-auto">
			<div class="d-flex flex-column align-items-center">
				<span class="small">
					Friends
				</span>
				<span class="font-weight-bold">
					0
				</span>
			</div>
			<div class="bg-grey" style="width: 1px;" />
			<div class="d-flex flex-column align-items-center">
				<span class="small">
					Questions
				</span>
				<span class="font-weight-bold">
					{{ formatNumber(Object.entries(user.meta.questions).length) }}
				</span>
			</div>
			<div class="bg-grey" style="width: 1px;" />
			<div class="d-flex flex-column align-items-center">
				<span class="small">
					Answers
				</span>
				<span class="font-weight-bold">
					{{ formatNumber(Object.entries(user.meta.answers).length) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/numbers'
import ShowRatings from '@app/components/core/ShowRatings.vue'
export default defineComponent({
	name: 'UserHeadCard',
	components: { ShowRatings },
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>
