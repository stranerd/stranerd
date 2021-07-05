<template>
	<div class="p-1">
		<template v-if="isLoggedIn">
			<ProfileHeadCard :user="user" />
			<div class="thick mx-n1" />
			<div class="d-flex flex-column">
				<h1 class="ranking-header">
					Ranking Up
				</h1>

				<div class="d-flex justify-content-between align-items-center mt-1 text-main">
					<span>Rookie</span>
					<ProgressBar :current="53" color="#00F332" class="mx-1" />
					<span>Comrade</span>
				</div>
				<div class="mt-1 d-flex flex-column ">
					<div class="d-flex justify-content-between align-items-center mt-1">
						<span class="stat">Ask 30 Questions</span>
						<ProgressBar :current="15" class="mx-1" />
					</div>

					<div class="d-flex justify-content-between align-items-center mt-1">
						<span class="stat">Answer 30 Questions</span>
						<ProgressBar :current="25" class="mx-1" />
					</div>

					<div class="d-flex justify-content-between align-items-center mt-1">
						<span class="stat">Attend 7 Sessions</span>
						<ProgressBar :current="50" class="mx-1" />
					</div>

					<div class="d-flex justify-content-between align-items-center mt-1">
						<span class="stat">30 Days Login</span>
						<ProgressBar :current="30" class="mx-1" />
					</div>
				</div>

				<!-- <div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-question.svg" class="me-0-75" height="24" width="24"> Questions</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.questions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-best-answers.svg" class="me-0-75" height="24" width="24"> Answered</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.bestAnsweredQuestions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-answers.svg" class="me-0-75" height="24" width="24"> Answers</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.answers.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-best-answers.svg" class="me-0-75" height="24" width="24"> Best Answers</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.bestAnswers.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-sessions.svg" class="me-0-75" height="24" width="24"> Sessions Hosted</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.tutorSessions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/profile-sessions.svg" class="me-0-75" height="24" width="24"> Sessions Attended</span>
					<p class="fw-bold">
						{{ formatNumber(user.account.meta.sessions.length) }}
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/user.svg" class="me-0-75" height="24" width="24"> Member Since</span>
					<p class="fw-bold">
						{{ formatTime(new Date(user.dates.signedUpAt), true) }}
					</p>
				</div> -->
			</div>
			<div class="thick mx-n1" />
			<div class="d-flex flex-column w-100">
				<h1 class="ranking-header">
					Popular Tags
				</h1>

				<div class="tag-input">
					<input type="text" placeholder="Create New Tags">
					<button>Create</button>
				</div>

				<div class="tag-body d-flex flex-wrap mt-2">
					<Tag v-for="n in tags" :key="n" :name="n" class="m-1" />
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/commons'
import { formatTime } from '@utils/dates'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
import ProgressBar from '@app/components/core/progressBar.vue'
import Tag from '@app/components/core/tags.vue'

export default defineComponent({
	name: 'RightSidebar',
	components: { ProfileHeadCard, ProgressBar, Tag },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		const tags = ['trigonometry', 'waves', 'e-mc2', 'motion', 'electromagnets', 'indices']
		return { id, isLoggedIn, user, tags, formatNumber, formatTime }
	}
})
</script>

<style lang="scss" scoped>
.ranking-header{
text-align: center;
font-size: 20px;
color: $color-text-main;
}
.mx-1{
	margin: 0px 4px !important;
}
.m-1{
	margin:  6px !important;
}
.stat{
	width: 350px;
	font-size: 14px;
	color: $color-text-sub;
}
.text-main{
	color: $color-main;

}
.tag-input{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 36px;
	input{
		border: 1.2px solid $color-line;
		background-color: $color-white;
		height: 42px;
		border-radius: 50px;
		width: 100%;
		color: $color-text-sub;
		padding: 0px 5px 0px 18px;

	}
	button{
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		height: 42px;
		border-radius: 50px;
		color: $color-text-main;
		position: absolute;
        right: 17px;
        padding: 8px 17px;
	}
}
</style>
