<template>
	<div class="d-flex flex-column nerd-body gap-1 mb-2-25">
		<div class="nerd-head nerd-card gap-1">
			<span class="d-flex justify-content-end">
				<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
					<Avatar :src="tutor.avatar" :size="72" />
					<i
						class="fas fa-circle position-absolute rounded-pill"
						:class="tutor.isOnline ? 'text-success' : 'text-grey'"
						style="z-index: 1; right: 0; bottom: 0; font-size: 1.25rem; border: 3px solid white;"
					/>
				</NuxtLink>
			</span>
			<div class="d-flex align-items-start flex-column ms-0-5">
				<NuxtLink :to="`/users/${tutor.id}`" class="name">
					{{ tutor.fullName }}
				</NuxtLink>
				<span class="rank">{{ tutor.rank.id }}</span>
			</div>
			<!-- TODO: Logic to request a session  -->
			<button class="btn btn-primary-blue ms-auto">
				Request A Session
			</button>
		</div>

		<div class="nerd-card gap-1-5">
			<span>
				<ShowRatings class="ms-auto" :rating="tutor.averageRating" />
			</span>
			<span>{{ formatNumber(tutor.meta.answers.length) }} {{ pluralize(tutor.meta.answers.length, 'Question', 'Questions') }} Answered</span>
			<span>{{ formatNumber(tutor.meta.tutorSessions.length) }} {{ pluralize(tutor.meta.tutorSessions.length, 'Session', 'Sessions') }} Hosted</span>
		</div>

		<div v-if="subject" class="nerd-card gap-1-5">
			<span>Strongest In</span>
			<span class="sub-text">{{ subject.name }}</span>
		</div>

		<div v-if="tutor.tags.length" class="nerd-card gap-1-5">
			<span>Routine Tags</span>
			<div class="d-flex align-items-cnter gap-0-75 flex-wrap">
				<TagListCard v-for="tag in tutor.tags" :key="tag.id" :tag="tag" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber, pluralize } from '@utils/commons'
import { useSubject } from '@app/hooks/questions/subjects'
import TagListCard from '@app/components/questions/tags/TagListCard.vue'
export default defineComponent({
	name: 'TutorsListCard',
	components: { TagListCard },
	props: {
		tutor: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const { subject } = useSubject(props.tutor.subject?.id ?? '')
		return { formatNumber, pluralize, subject }
	}
})
</script>

<style lang="scss" scoped>
	.nerd-card {
		display: flex;
		align-items: center;

		& > *:first-child {
			min-width: 120px;
			text-align: right;
			font-size: 1rem;
		}

		.sub-text {
			font-size: 18px;
			color: $color-main;
			font-weight: normal;
		}

		span {
			color: $color-text-sub;
			font-size: 18px;
			font-weight: 600;
		}
	}

	.nerd-body {
		background: $color-white;
		border: 1px solid $color-line;
		padding: 1.5rem 3rem;
		border-radius: 12px;
	}

	.nerd-head {
		display: flex;
		align-items: center;

		.name {
			color: $color-text-main;
			font-size: 24px;
			font-weight: 600;
		}

		.rank {
			color: $color-main;
			font-weight: 600;
			font-size: 18px;
		}
	}
</style>
