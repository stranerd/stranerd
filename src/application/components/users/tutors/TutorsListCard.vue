<template>
	<div class="d-flex flex-wrap justify-content-between w-100">
		<div v-for="n in 4" :key="n" class="mb-2 mb-md-2-25 w-48">
			<div class="flex-column nerd-body shadow gap-0-5 d-md-flex">
				<div class="d-flex align-items-center nerd-card gap-1 custom-p">
					<span class="d-flex justify-content-start">
						<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
							<Avatar :size="72" :src="tutor.avatar" />
							<i
								:class="tutor.isOnline ? 'text-success' : 'text-sub'"
								class="fas fa-circle position-absolute rounded-pill"
								style="z-index: 1; right: 0; bottom: 0; font-size: 1.25rem; border: 3px solid white;"
							/>
						</NuxtLink>
					</span>
					<div class="d-flex align-items-start align-self-end flex-column ms-1 gap-0-75">
						<NuxtLink :to="`/users/${tutor.id}`" class="name">
							<DynamicText class="fw-bold">
								{{ tutor.fullName }}
							</DynamicText>
						</NuxtLink>
						<DynamicText class="rank">
							{{ tutor.rank.id }}
						</DynamicText>
					</div>
				</div>

				<div class="nerd-card gap-1-5 custom-p">
					<ShowRatings :rating="tutor.averageRating" />
					<span class="session">
						36 Sessions Hosted
					</span>
				</div>
				<div class="nerd-card gap-1-5 custom-p">
					<span class=" text-sub">
						Teaches
					</span>
					<DynamicText class="head-text ms-1-5 text-primary">
						Mathematics
					</DynamicText>
				</div>
				<div class="nerd-card gap-1-5 custom-p">
					<span class=" text-sub">
						Takes
					</span>
					<DynamicText class="head-text ms-2-5 fw-bold text-sub">
						High School
					</DynamicText>
				</div>
				<div class="d-flex justify-content-center">
					<button
						class="btn btn-primary ms-auto rounded-pill mt-1"
						@click="requestNewSession"
					>
						Request A Session
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="mb-2 mb-md-2-25">
		<div class="flex-column nerd-body gap-1 d-md-flex d-none">
			<div class="d-flex align-items-center nerd-card gap-1">
				<span class="d-flex justify-content-end">
					<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
						<Avatar :size="72" :src="tutor.avatar" />
						<i
							:class="tutor.isOnline ? 'text-success' : 'text-sub'"
							class="fas fa-circle position-absolute rounded-pill"
							style="z-index: 1; right: 0; bottom: 0; font-size: 1.25rem; border: 3px solid white;"
						/>
					</NuxtLink>
				</span>
				<div class="d-flex align-items-start align-self-end flex-column ms-0-5 gap-0-75">
					<NuxtLink :to="`/users/${tutor.id}`" class="name">
						<DynamicText>{{ tutor.fullName }}</DynamicText>
					</NuxtLink>
					<DynamicText class="rank">
						{{ tutor.rank.id }}
					</DynamicText>
				</div>
				<button
					v-if="canRequestSession"
					class="btn btn-primary ms-auto rounded-pill"
					@click="requestNewSession"
				>
					Request A Session
				</button>
			</div>

			<div class="nerd-card gap-1-5">
				<span>
					<ShowRatings :rating="tutor.averageRating" class="ms-auto" />
				</span>
				<DynamicText class="head-text">
					{{ formatNumber(tutor.meta.answers.length) }}
					{{ pluralize(tutor.meta.answers.length, 'Question', 'Questions') }} Answered
				</DynamicText>
				<DynamicText class="head-text">
					{{ formatNumber(tutor.meta.tutorSessions.length) }}
					{{ pluralize(tutor.meta.tutorSessions.length, 'Session', 'Sessions') }} Hosted
				</DynamicText>
			</div>

			<div v-if="tutor.strongestSubject" class="nerd-card gap-1-5">
				<span class="head-text">Strongest In</span>
				<Subject :subject-id="tutor.strongestSubject" class="sub-text" />
			</div>

			<div v-if="tutor.tags.length" class="nerd-card gap-1-5">
				<span class="head-text">Frequent Tags</span>
				<div class="d-flex align-items-center flex-wrap gap-0-75 flex-wrap">
					<Tag v-for="tag in tutor.tags" :key="tag.id" :tag="tag.id" />
				</div>
			</div>
		</div>
		<div class="d-flex flex-column align-items-center nerd-body gap-0-75 d-md-none">
			<NuxtLink :to="`/users/${tutor.id}`" class="position-relative">
				<Avatar :size="70" :src="tutor.avatar" />
				<i
					:class="tutor.isOnline ? 'text-success' : 'text-sub'"
					class="fas fa-circle position-absolute rounded-pill"
					style="z-index: 1; right: 0; bottom: 0; font-size: 1rem; border: 3px solid white;"
				/>
			</NuxtLink>

			<NuxtLink :to="`/users/${tutor.id}`" class="name" style="font-size: 19px;">
				<DynamicText>{{ tutor.fullName }}</DynamicText>
			</NuxtLink>

			<DynamicText class="rank">
				{{ tutor.rank.id }}
			</DynamicText>

			<ShowRatings :rating="tutor.averageRating" />
			<DynamicText class="fw-bold head-text">
				{{ formatNumber(tutor.meta.answers.length) }}
				{{ pluralize(tutor.meta.answers.length, 'Question', 'Questions') }} Answered
			</DynamicText>
			<DynamicText class="fw-bold head-text">
				{{ formatNumber(tutor.meta.tutorSessions.length) }}
				{{ pluralize(tutor.meta.tutorSessions.length, 'Session', 'Sessions') }} Hosted
			</DynamicText>

			<div v-if="tutor.strongestSubject" class="d-flex align-items-center gap-0-25 fw-bold">
				<span class="head-text">Strongest In</span>
				<Subject :subject-id="tutor.strongestSubject" class="sub-text" />
			</div>

			<div v-if="tutor.tags.length" class="d-flex justify-content-center flex-wrap gap-0-25">
				<Tag v-for="tag in tutor.tags" :key="tag.id" :tag="tag.id" />
			</div>

			<button v-if="canRequestSession" class="btn-sm btn btn-primary rounded-pill" @click="requestNewSession">
				Request A Session
			</button>
		</div>
	</div> -->
</template>

<script lang="ts">
// @ts-ignore
// eslint-disabled
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserEntity } from '@modules/users'
import { formatNumber, pluralize } from '@utils/commons'
// import Tag from '@app/components/questions/tags/Tag.vue'
// import Subject from '@app/components/questions/subjects/Subject.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionModal } from '@app/hooks/core/modals'
import { setNewSessionTutorIdBio } from '@app/hooks/sessions/sessions'

export default defineComponent({
	name: 'TutorsListCard',
	// components: { Tag, Subject },
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
			set: () => {
			}
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
	.btn {
		min-width: 100%;
		max-width: 20rem;
	}

	.session {
		font-weight: 700;
		font-size: 1rem;
	}

	.w-48 {
		width: 100%;
		@media (min-width: $md) {
			width: 48%;
		}
	}

	.nerd-card {
		display: flex;
		align-items: center;
		@media (min-width: $md) {
			& > *:first-child {
				// min-width: 120px;
				text-align: right;
				font-size: 1rem;
			}
		}
	}

	.head-text {
		font-size: 18px;
	}

	.sub-text {
		font-size: 18px;
		color: $color-primary;
		font-weight: normal;
	}

	.custom-p {
		padding-right: 3rem;
		padding-left: 3rem;
		@media (min-width: $sm) {
			padding: 0 2rem;
		}
	}

	.nerd-body {
		background: $color-white;
		border-radius: 12px;
		padding: 1rem 1rem;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
		@media (min-width: $sm) {
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
		}
	}

	.name {
		color: $color-dark;
		font-size: 24px;
		font-weight: 600;
	}

	.rank {
		color: $color-primary;
		font-size: 18px;
		font-weight: 400;
	}
</style>
