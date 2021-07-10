<template>
	<div class=" d-flex flex-column pt-2 wrapper">
		<div class="question-body ml-1 mr-2 mt-1">
			<span>From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the horizontal plane at a speed of 21 m/s. Calculate the total time the ball is in the air?</span>
		</div>

		<div class="question-bottom ml-1  my-2 d-flex align-items-center justify-content-between">
			<div class="left d-flex align-items-center">
				<span class="name me-1">Posted 30 mins ago</span>
				<div class="tag" style="margin-right:4px;">
					motion
				</div>
				<div class="tag">
					projectile-motion
				</div>
			</div>
			<div class="left d-flex align-items-center">
				<img src="@app/assets/images/icons/answers.svg" alt="" class="icons"> <span class="pr-1">5 ans</span>
			</div>
		</div>
	</div>
	<!-- <div :id="question.id">
		<NuxtLink class="text-18 d-block mb-0-5" :to="`/questions/${question.id}`">
			{{ question.trimmedBody }}
		</NuxtLink>
		<div class="d-flex gap-0-5">
			<span class="text-wrap me-auto">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ formatTime(question.createdAt) }}
			</span>
			<span>
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 24px; height: 24px;">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
			</span>
			<i v-if="question.isAnswered" class="fas fa-check text-success fa-2x" />
		</div>
	</div> -->
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
// import { useSubject } from '@app/hooks/questions/subjects'
// import { formatNumber, pluralize } from '@utils/commons'
// import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'UserQuestionsListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	}
	// setup (props) {
	// 	const { subject } = useSubject(props.question.subjectId)
	// 	return { subject, formatTime, formatNumber, pluralize }
	// }
})
</script>
<style lang="scss" scoped>
	.question-body {
		span {
			margin: 32px 0;
			font-size: 16px;
		}
	}
		.questionStyle {
		font-size: 16px;
		color: $color-text-main;
	}

	.icons {
		width: 24px;
		margin-right: 8px;
	}
   .bl {
		border-bottom: 1px solid $color-line;
	}
	.tag {
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		border-radius: 50px;
		color: $color-text-main;
		padding: 1px 14px;
	}
	.wrapper {
		border-bottom: 1px solid $color-line;
	}
</style>
