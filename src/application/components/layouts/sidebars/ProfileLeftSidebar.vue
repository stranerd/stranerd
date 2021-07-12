<template>
	<div v-if="user" class="d-flex flex-column gap-2-25">
		<div class="d-flex flex-column gap-1 box">
			<div class="d-flex flex-column gap-1-5 align-items-center text-blue">
				<Avatar :src="user.avatar" :size="144" />
				<div class="d-flex flex-column gap-0-25 align-items-center">
					<h1>{{ user.fullName }}</h1>
					<span class="text-primary">{{ user.rank.id }}</span>
					<div class="d-flex align-items-center gap-0-5">
						<ShowRatings :rating="user.averageRating" />
						<span>{{ formatNumber(user.ratingCount) }} {{ pluralize(user.ratingCount, 'review', 'reviews') }}</span>
					</div>
				</div>
				<button class="sidebar-btn px-2">
					Request a Session
				</button>
			</div>

			<div class="thick mx-n1" />

			<div class="stats">
				<div class="stat-title gap-1">
					<img src="@app/assets/images/icons/profileSidebar/questions.svg" alt="">
					<span>Questions</span>
				</div>
				<span class="count fw-bold">{{ formatNumber(Object.entries(user.meta.questions).length) }}</span>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img src="@app/assets/images/icons/profileSidebar/answered.svg" alt="">
					<span>Answered Questions</span>
				</div>
				<span class="count fw-bold">{{ formatNumber(Object.entries(user.meta.answeredQuestions).length) }}</span>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img src="@app/assets/images/icons/profileSidebar/answers.svg" alt="">
					<span>Answers</span>
				</div>
				<span class="count fw-bold">{{ formatNumber(Object.entries(user.meta.answers).length) }}</span>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img src="@app/assets/images/icons/profileSidebar/best-answer.svg" alt="">
					<span>Best Answers</span>
				</div>
				<span class="count">{{ formatNumber(Object.entries(user.meta.bestAnswers).length) }} </span>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img src="@app/assets/images/icons/profileSidebar/sessions-attended.svg" alt="">
					<span>Sessions Attended</span>
				</div>
				<span class="count">{{ formatNumber(Object.entries(user.meta.sessions).length) }}</span>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img src="@app/assets/images/icons/profileSidebar/sessions-hosted.svg" alt="">
					<span>Sessions Hosted</span>
				</div>
				<span class="count">{{ formatNumber(Object.entries(user.meta.sessions).length) }}</span>
			</div>
			<div class="stats">
				<div class="stat-title gap-1">
					<img src="@app/assets/images/icons/profileSidebar/member-since.svg" alt="">
					<span>Member Since</span>
				</div>
				<span class="count">{{ formatTime(user.dates.signedUpAt) }}</span>
			</div>
		</div>

		<div
			v-if="user.description || user.strongestSubject || user.tags.length > 0"
			class="d-flex flex-column gap-0-5 text-dark box"
		>
			<template v-if="user.description">
				<h1 class="fw-bold">
					About Me
				</h1>
				<p>{{ user.description }}</p>
				<div class="thick mx-n1" />
			</template>

			<template v-if="user.strongestSubject">
				<h1 class="fw-bold">
					Strongest In
				</h1>
				<Subject :subject-id="user.strongestSubject.id" />
				<div class="thick mx-n1" />
			</template>

			<template v-if="user.weakerSubjects.length > 0">
				<h1 class="fw-bold">
					Also Good In
				</h1>
				<div class="d-flex flex-wrap gap-0-25">
					<Subject v-for="subject in user.weakerSubjects" :key="subject.id" :subject-id="subject.id" />
				</div>
				<div class="thick mx-n1" />
			</template>

			<template v-if="user.tags.length > 0">
				<h1 class="fw-bold">
					Frequent Tags
				</h1>
				<div class="d-flex flex-wrap gap-0-5">
					<Tag v-for="tag in user.tags" :key="tag.id" :tag="tag.id" />
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
export default defineComponent({
	name: 'ProfileLeftSidebar',
	components: { Tag, Subject },
	setup () {
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user, formatNumber, formatTime, pluralize }
	}
})
</script>

<style lang="scss" scoped>

	p {
		margin: 0;
	}

	.box {
		background: $color-white;
		border-radius: 6px;
		border: 1px solid $color-line;
		padding: 36px;
		max-width: 30rem;

		h1 {
			font-size: 1.5rem;
			margin: 0;
		}
	}

	.sidebar-btn {
		border: none;
		outline: none;
		border-radius: 6px;
		font-size: 1rem;
	}

	.stats {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $color-dark;

		.stat-title {
			display: flex;
			align-items: center;

			img {
				height: 1.5rem;
				width: 1.5rem;
			}
		}

		.count { font-weight: bold; }
	}
</style>
