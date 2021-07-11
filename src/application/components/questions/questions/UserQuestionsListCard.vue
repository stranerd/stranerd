<template>
	<div :id="question.id" class="d-flex flex-column gap-1 p-1">
		<NuxtLink class="text-18" :to="`/questions/${question.id}`">
			{{ question.trimmedBody }}
		</NuxtLink>
		<div class="d-flex align-items-center gap-0-5">
			<img v-if="question.isAnswered" src="@app/assets/images/icons/profile-best-answers.svg" class="icons">
			<span>{{ subject ? subject.name : 'Subject' }}</span>
			<div class="dot" />
			<span>Posted {{ formatTime(question.createdAt) }}</span>
			<div class="gap-0-75 d-flex align-items-center mx-auto">
				<TagListCard v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
			<span class="d-flex align-items-center gap-0-5">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
				<img src="@app/assets/images/icons/answers.svg" alt="" class="icons">
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import TagListCard from '@app/components/questions/tags/TagListCard.vue'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'UserQuestionsListCard',
	components: { TagListCard },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { subject } = useSubject(props.question.subjectId)
		return { subject, formatTime, formatNumber, pluralize }
	}
})
</script>

<style lang="scss" scoped>
	.dot {
		width: 6px;
		height: 6px;
		background-color: $color-sub;
		margin: 0 8px;
		border-radius: 50px;
	}

	.icons {
		width: 24px;
		height: 24px;
	}
</style>
