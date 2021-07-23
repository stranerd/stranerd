<template>
	<div :id="review.id" class="d-flex flex-column gap-1 p-1 text-dark">
		<div class="d-flex gap-1 align-items-center">
			<Avatar :src="review.avatar" :size="36" />
			<DynamicText class="name">
				{{ review.userBio.name.fullName }}
			</DynamicText>
			<span class="d-flex align-items-center gap-0-25">
				<i class="fas fa-star text-gold" style="font-size: 21px;" />
				<DynamicText class="text-primary" style="height: 1rem;">{{ review.rating }}/5</DynamicText>
			</span>
			<DynamicText style="font-size: 14px; height: 14px;">
				{{ formatTime(review.createdAt) }}
			</DynamicText>
		</div>

		<DynamicText>{{ review.review }}</DynamicText>
	</div>
</template>

<script lang="ts">
import { ReviewEntity } from '@modules/users'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'ReviewListCard',
	props: {
		review: {
			required: true,
			type: Object as PropType<ReviewEntity>
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>
<style lang="scss" scoped>
	.name {
		font-size: 17px;
		font-weight: 600;
	}

	.subject {
		font-weight: 600;
	}
</style>
