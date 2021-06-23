<template>
	<div :id="tutor.id" class="my-1 d-flex align-items-baseline align-items-md-center gap-0-5">
		<span>{{ rank }}.&nbsp;</span>
		<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
			<Avatar :src="tutor.avatar" :size="50" />
			<i class="fas fa-circle position-absolute" :class="tutor.isOnline ? 'text-success' : 'text-grey'" style="z-index: 1; right: 0; bottom: 0;" />
		</NuxtLink>
		<div class="flex-grow-1 d-flex flex-column flex-md-row align-self-start align-self-md-center">
			<NuxtLink :to="`/users/${tutor.id}`" class="text-wrap text-break me-auto" style="font-weight: 600">
				<span>{{ tutor.fullName }}</span>
			</NuxtLink>
			<div class="d-flex flex-column flex-md-row align-items-md-center gap-0-25 gap-md-1">
				<span v-if="subject" class="d-block text-wrap text-break" style="font-weight: 500;">{{ subject.name }}</span>
				<ShowRatings :rating="tutor.averageRating" />
				<span class="text-wrap text-break">{{ formatNumber(tutor.ratingCount) }} {{ pluralize(tutor.ratingCount, 'review', 'reviews') }}</span>
			</div>
		</div>
		<NuxtLink :to="`/messages/${tutor.id}`" class="btn btn-sm btn-outline-blue rounded-pill align-self-center">
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
