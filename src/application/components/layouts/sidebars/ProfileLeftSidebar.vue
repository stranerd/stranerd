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

		<div class="d-flex flex-column gap-1 box">
			<div class="d-flex flex-column gap-0-5 text-dark">
				<template v-if="description">
					<h1 class="fw-bold">
						About Me
					</h1>
					<p>
						{{ user.description }}
					</p>
				</template>

				<div class="thick mx-n1" />

				<template v-if="user.subject">
					<h1 class="fw-bold">
						Strongest In
					</h1>
					<Subject :subject-id="user.subject.id" />

					<div class="thick mx-n1" />

					<h1 class="fw-bold">
						Also Good In
					</h1>
					<p>
						Mathematics Biology Chemistry
					</p>
					<!-- TODO: figure out concept behind also good in other subjects -->
				</template>

				<div class="thick mx-n1" />

				<h1 class="fw-bold">
					Frequent Tags
				</h1>
				<p class="d-flex flex-wrap gap-0-5">
					<TagListCard v-for="tag in user.tags" :key="tag.id" :tag="tag" />
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import TagListCard from '@app/components/questions/tags/TagListCard.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
export default defineComponent({
	name: 'ProfileLeftSidebar',
	components: { TagListCard, Subject },
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
		justify-content: between;
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
