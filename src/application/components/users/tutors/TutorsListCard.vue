<template>
	<div class="d-flex align-items-center" :id="tutor.id">
		<span>{{ rank }}.&nbsp;</span>
		<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
			<Avatar :src="tutor.avatar" :size="50" />
			<i class="fas fa-circle d-md-none position-absolute" :class="tutor.isOnline ? 'text-green' : 'text-grey'" style="z-index: 1; right: 0; bottom: 0;" />
		</NuxtLink>
		<div class="ml-1 mr-auto">
			<NuxtLink :to="`/users/${tutor.id}`" class="d-block font-weight-bold text-wrap">
				<span>{{ tutor.fullName }}</span>
			</NuxtLink>
			<span class="d-md-none">
				<ShowRatings :rating="tutor.averageRating" />
			</span>
		</div>
		<span class="d-none d-md-inline text-nowrap">
			<span>
				<i class="fas fa-circle" :class="tutor.isOnline ? 'text-green' : 'text-grey'" />
				<span>{{ tutor.isOnline ? 'Online' : 'Offline' }}</span>
			</span>
			<ShowRatings class="ml-1 ml-lg-2" :rating="tutor.averageRating" />
			<span class="ml-1 ml-lg-2">{{ tutor.ratingCount }} reviews</span>
		</span>
		<button class="ml-1 ml-lg-2 btn btn-sm btn-outline-blue rounded-pill">
			Message
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import ShowRatings from '@app/components/core/ShowRatings.vue'
export default defineComponent({
	name: 'TutorsListCard',
	components: { ShowRatings },
	props: {
		tutor: {
			type: Object as PropType<UserEntity>,
			required: true
		},
		rank: {
			type: Number,
			required: true
		}
	}
})
</script>
