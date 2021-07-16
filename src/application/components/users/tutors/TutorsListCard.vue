<template>
	<div class="d-flex flex-column nerd-body gap-1 mb-2-25">
		<div class="nerd-head nerd-card gap-1">
			<span class="d-flex justify-content-end">
				<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
					<Avatar :src="tutor.avatar" :size="72" />
					<i
						class="fas fa-circle position-absolute rounded-pill"
						:class="tutor.isOnline ? 'text-success' : 'text-sub'"
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
			<button v-if="canRequestSession" class="btn btn-primary ms-auto" @click="requestNewSession">
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

		<div v-if="tutor.strongestSubject" class="nerd-card gap-1-5">
			<span>Strongest In</span>
			<Subject :subject-id="tutor.strongestSubject.id" class="sub-text" />
		</div>

		<div v-if="tutor.tags.length" class="nerd-card gap-1-5">
			<span>Routine Tags</span>
			<div class="d-flex align-items-cnter gap-0-75 flex-wrap">
				<Tag v-for="tag in tutor.tags" :key="tag.id" :tag="tag.id" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber, pluralize } from '@utils/commons'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionModal } from '@app/hooks/core/modals'
import { setNewSessionTutorIdBio } from '@app/hooks/sessions/sessions'
export default defineComponent({
	name: 'TutorsListCard',
	components: { Tag, Subject },
	props: {
		tutor: {
			type: Object as PropType<UserEntity>,
			required: true
		}
	},
	setup (props) {
		const { user } = useAuth()
		const canRequestSession = computed({
			get: () => user.value &&
				user.value.id !== props.tutor.id &&
				user.value.canRequestSessions &&
				props.tutor.canHostSessions,
			set: () => {}
		})
		const requestNewSession = () => {
			setNewSessionTutorIdBio({ id: props.tutor.id!, user: props.tutor.bio })
			useSessionModal().openCreateSession()
		}
		return { formatNumber, pluralize, canRequestSession, requestNewSession }
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
			color: $color-primary;
			font-weight: normal;
		}

		span {
			color: $color-sub;
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
			color: $color-dark;
			font-size: 24px;
			font-weight: 600;
		}

		.rank {
			color: $color-primary;
			font-weight: 600;
			font-size: 18px;
		}
	}
</style>
