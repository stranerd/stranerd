<template>
	<div class="d-flex flex-column align-items-center my-1">
		<Avatar :src="user.avatar" :size="90" />
		<span class="text-18 font-weight-bold">{{ user.fullName }}</span>
		<div class="d-flex justify-content-around mx-auto my-2 w-100" style="max-width: 250px;">
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
					{{ formatNumber(user.meta.questionCount) }}
				</span>
			</div>
			<div class="bg-grey" style="width: 1px;" />
			<div class="d-flex flex-column align-items-center">
				<span class="small">
					Answers
				</span>
				<span class="font-weight-bold">
					{{ formatNumber(user.meta.answerCount) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'UserHeadCard',
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
