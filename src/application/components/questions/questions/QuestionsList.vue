<template>
	<div>
		<section class="d-flex flex-column flex-md-row text-center">
			<h1 class="text-grey">
				Questions
			</h1>
			<form class="form-inline mx-auto mr-md-0 ml-md-auto">
				<select class="form-control form-control-sm rounded-pill mr-1 my-1">
					<option disabled :value="null">
						Please
					</option>
					<option v-for="(option, index) in ['All', 'Answered', 'Unanswered']" :key="index" :value="option">
						{{ option }}
					</option>
				</select>
				<select class="form-control form-control-sm rounded-pill my-1">
					<option disabled :value="null">
						Please
					</option>
					<option v-for="(option, index) in ['All', 'Answered', 'Unanswered']" :key="index" :value="option">
						{{ option }}
					</option>
				</select>
			</form>
		</section>
		<hr class="thick bg-light-grey">
		<div>
			<div v-for="question in questions" :key="question.hash">
				<QuestionCard :question="question" />
				<hr class="thick bg-light-grey">
			</div>
			<div class="text-center py-1 text-18">
				<a class="font-weight-bold text-grey" @click.prevent="">LOAD MORE</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/QuestionsListCard.vue'
export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionCard },
	setup () {
		const question = {
			hash: Math.random().toString(36).substr(2, 12),
			body: 'From the top of a building with a height of 16m, a ball is thrown at an angle of 30 degree to the horizontal plane at a speed of 21 m/s. Calculate the total time the ball is in the air?',
			credits: 15,
			subjectId: 'Physics',
			user: {
				name: 'John Doe',
				image: {
					link: '/images/user_profile.png'
				}
			}
		}
		const questions = [question, question, question]
		return { questions }
	}
})
</script>
