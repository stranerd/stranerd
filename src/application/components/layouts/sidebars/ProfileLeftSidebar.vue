<template>
	<div class="d-flex flex-column gap-2-25">
		<div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-1-5 align-items-center text-blue">
				<Avatar :src="user.avatar" :size="150" />
				<div class="d-flex flex-column gap-0-3 align-items-center">
					<h1>
						{{ user.fullName }}
					</h1>
					<span class="text-primary">{{ user.rank.id }}</span>
					<div class="d-flex">
						<!-- <ShowRatings class="ms-auto" :rating="user.averageRating" /> -->
						<ShowRatings class="ms-auto" :rating="5" />
						<span class="ms-0-5">(974 reviews)</span>
					</div>
				</div>
				<button class="sidebar-btn px-2">
					Request a Session
				</button>
			</div>

			<div class="thick mx-n1" />
			<div class="d-flex justify-content-between align-items-center">
				<div class="stats d-flex align-items-center gap-1">
					<img src="@app/assets/images/icons/profileSidebar/questions.svg" alt="">
					<span class="name">Questions</span>
				</div>
				<span class="count text-dark fw-bold">{{ Object.entries(user.meta.questions).length }}</span>
			</div>
			<div class="d-flex justify-content-between align-items-center">
				<div class="stats d-flex align-items-center gap-1">
					<img src="@app/assets/images/icons/profileSidebar/answered.svg" alt="">
					<span class="name">Answered Questions</span>
				</div>
				<span class="count text-dark fw-bold">{{ Object.entries(user.meta.answeredQuestions).length }}</span>
			</div>
			<div class="d-flex justify-content-between align-items-center">
				<div class="stats d-flex align-items-center gap-1">
					<img src="@app/assets/images/icons/profileSidebar/answers.svg" alt="">
					<span class="name">answers</span>
				</div>
				<span class="count text-dark fw-bold">{{ Object.entries(user.meta.answers).length }}</span>
			</div>
			<div class="d-flex justify-content-between align-items-center">
				<div class="stats d-flex align-items-center gap-1">
					<img src="@app/assets/images/icons/profileSidebar/best-answer.svg" alt="">
					<span class="name">Best Answers</span>
				</div>
				<span class="count text-dark fw-bold">{{ Object.entries(user.meta.bestAnswers).length }} </span>
			</div>
			<div class="d-flex justify-content-between align-items-center">
				<div class="stats d-flex align-items-center gap-1">
					<img src="@app/assets/images/icons/profileSidebar/sessions-attended.svg" alt="">
					<span class="name">Sessions Attended</span>
				</div>
				<span class="count text-dark fw-bold">{{ Object.entries(user.meta.sessions).length }}</span>
			</div>
			<div class="d-flex justify-content-between align-items-center">
				<div class="stats d-flex align-items-center gap-1">
					<img src="@app/assets/images/icons/profileSidebar/sessions-hosted.svg" alt="">
					<span class="name">Sessions Hosted</span>
				</div>
				<span class="count text-dark fw-bold">{{ Object.entries(user.meta.sessions).length }}</span>
			</div>
			<div class="d-flex justify-content-between align-items-center">
				<div class="stats d-flex align-items-center gap-1">
					<img src="@app/assets/images/icons/profileSidebar/member-since.svg" alt="">
					<span class="name">Member Since</span>
				</div>
				<span class="count text-dark fw-bold">May 2020</span>
			</div>
		</div>

		<div class="d-flex flex-column gap-1 ranking">
			<div class="d-flex flex-column gap-0-5 align-items-center text-blue">
				<h1 class="text-dark fw-bold text-start w-100">
					About Me
				</h1>
				<p class="text-dark text-start">
					I am a Physics major in the University of Kentucky. I am passionate about physics and love to contribute to any community that I can help and assist anyone with their problems in Physics.
				</p>

				<div class="thick mx-n1 w-100" />

				<h1 class="text-dark fw-bold text-start w-100">
					Strongest In
				</h1>
				<p class="text-dark text-start w-100">
					Physics
				</p>

				<div class="thick mx-n1 w-100" />

				<h1 class="text-dark fw-bold text-start w-100">
					Also Good In
				</h1>
				<p class="text-dark text-start w-100">
					Mathematics Biology Chemistry
				</p>

				<div class="thick mx-n1 w-100" />

				<h1 class="text-dark fw-bold text-start w-100">
					Frequent Tags
				</h1>
				<p class="text-dark text-start w-100">
					<span class="tag">waves</span>
					<span class="tag">motion</span>
					<span class="tag">algebra</span>
					<span class="tag">projectiles</span>
					<span class="tag">simple-harmonic-motion</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'RightSidebar',
	setup () {
		const { id, user } = useAuth()
		return { id, user }
	}
})
</script>

<style lang="scss" scoped>

p{
	margin: 0;
}
	.tag {
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		border-radius: 50em;
		color: $color-dark;
		padding: 0.125em 1em;
		margin-top: 1rem;
	}
	.tags {
		background: $color-tags;
		border: 1px solid $color-line;
		padding: 36px;
	}

	.ranking {
		background: #fff;
		border-radius: 6px;
		border: 1px solid $color-line;
		padding: 36px;
		max-width: 30rem;
		h1{
			font-size: 1.5rem;
			margin: 0;
		}
		.rank{
			font-size: 1.25rem;
		}
	}
	.sidebar-btn{
		border: none;
		outline: none;
		border-radius: 6px;
		font-size: 1rem;
	}
	.img-rank {
		width: 9rem;
	}

	.ranking-header {
		text-align: center;
		font-size: 24px;
		color: $color-dark;
	}

	.stats {
		img{
			height: 1.5rem;
			width: 1.5rem;
		}

	}

</style>
