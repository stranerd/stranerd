<template>
	<div :id="tutor.id" class="d-flex align-items-center gap-1">
		<span>{{ rank }}.&nbsp;</span>
		<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
			<Avatar :src="tutor.avatar" :size="50" />
			<i class="fas fa-circle d-md-none position-absolute" :class="tutor.isOnline ? 'text-success' : 'text-grey'" style="z-index: 1; right: 0; bottom: 0;" />
		</NuxtLink>
		<div class="me-auto">
			<NuxtLink :to="`/users/${tutor.id}`" class="d-block fw-bold text-wrap">
				<span>{{ tutor.fullName }}</span>
			</NuxtLink>
			<span class="d-md-none">
				<ShowRatings :rating="tutor.averageRating" />
			</span>
		</div>
		<span class="d-none d-md-flex text-nowrap gap-2 align-items-center">
			<span>
				<i class="fas fa-circle" :class="tutor.isOnline ? 'text-success' : 'text-grey'" />
				<span>{{ tutor.isOnline ? 'Online' : 'Offline' }}</span>
			</span>
			<ShowRatings :rating="tutor.averageRating" />
			<span>{{ formatNumber(tutor.ratingCount) }} {{ pluralize(tutor.ratingCount, 'review', 'reviews') }}</span>
		</span>
		<NuxtLink :to="`/messages/${tutor.id}`" class="btn btn-sm btn-outline-blue rounded-pill">
			Message
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber, pluralize } from '@utils/numbers'
export default defineComponent({
	name: 'TutorsListCard',
	props: {
		tutor: {
			type: Object as PropType<UserEntity>,
			required: true
		},
		rank: {
			type: Number,
			required: true
		}
	},
	setup () {
		return { formatNumber, pluralize }
	}
})
</script>
