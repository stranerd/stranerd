<template>
	<div>
		<div class="d-flex align-items-center">
			<h1 class="mb-0 mr-2 font-weight-bold">
				Stats
			</h1>
			<img src="@app/assets/images/icons/stats.svg" alt="" height="32">
		</div>
		<hr class="thick">
		<p>Questions: <span>{{ formatNumber(user.meta.questionCount) }}</span></p>
		<p>Answers: <span>{{ formatNumber(user.meta.answerCount) }}</span></p>
		<p>Comments: <span>{{ formatNumber(user.meta.answerCommentCount + user.meta.questionCommentCount) }}</span></p>
		<p>Joined: <span>{{ new Date(user.dates.signedUpAt).toDateString() }}</span></p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'UserAboutCard',
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

<style lang="scss">
p{
	font-size: 24px;
	margin-bottom: 0.5rem;
	span {
		font-weight: bold;
	}
}
</style>
