<template>
	<div :id="tutor.id" class="my-2 d-flex align-items-start align-items-md-center gap-1">
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
				<span v-if="subject" class="d-block" style="font-weight: 600;">{{ subject.name }}</span>
				<ShowRatings :rating="tutor.averageRating" />
			</span>
		</div>
		<span class="d-none d-md-flex text-nowrap gap-1 align-items-center">
			<span v-if="subject" style="font-weight: 600;">{{ subject.name }}</span>
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
import { formatNumber, pluralize } from '@utils/commons'
import { useSubject } from '@app/hooks/questions/subjects'
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
	setup (props) {
		const { subject } = useSubject(props.tutor.subject?.id ?? '')
		return { formatNumber, pluralize, subject }
	}
})
</script>
