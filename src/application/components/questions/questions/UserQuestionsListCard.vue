<template>
	<div :id="question.id" class="d-flex flex-column py-1 border-bottom border-line gap-1">
		<NuxtLink class="text-18" :to="`/questions/${question.id}`">
			<DynamicText>{{ question.trimmedBody }}</DynamicText>
		</NuxtLink>
		<div class="d-flex flex-row flex-wrap align-items-center gap-0-5">
			<img v-if="question.isAnswered" src="@app/assets/images/icons/profile-best-answers.svg" class="sub-icons">
			<Subject :subject-id="question.subjectId" />
			<div class="dot" />
			<DynamicText class="me-auto">
				Posted {{ formatTime(question.createdAt) }}
			</DynamicText>
			<div class="order-md-1 ms-auto">
				<span class="d-flex align-items-center gap-0-5">
					<DynamicText>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</DynamicText>
					<img src="@app/assets/images/icons/answers.svg" alt="" class="sub-icons">
				</span>
			</div>
			<div class="gap-0-25 d-flex align-items-center flex-wrap">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { QuestionEntity } from '@modules/questions'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'UserQuestionsListCard',
	components: { Tag, Subject },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup () {
		return { formatTime, formatNumber, pluralize }
	}
})
</script>

<style lang="scss" scoped>
	.dot {
		width: 6px;
		height: 6px;
		background-color: $color-sub;
		border-radius: 50px;
	}
</style>
