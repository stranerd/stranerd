<template>
	<div :id="question.id" class="d-flex flex-column col-12 px-1 py-1">
		<NuxtLink class="text-18" :to="`/questions/${question.id}`">
			{{ question.trimmedBody }}
		</NuxtLink>
		<div class="d-flex flex-row flex-wrap align-items-center col-12 py-1 px-0">
			<div>
				<img v-if="question.isAnswered" src="@app/assets/images/icons/profile-best-answers.svg" class="icons">
			</div>
			<div>
				<Subject :subject-id="question.subjectId" />
			</div>
			<div class="dot" />
			<div>
				<span>Posted {{ formatTime(question.createdAt) }}</span>
			</div>
			<div class="px-1 d-flex align-items-center flex-row flex-wrap d-md-inline-block d-none">
				<span v-for="tag in question.tags" :key="tag" class="ms-1">
					<Tag :tag="tag" />
				</span>
			</div>
			<div class="ml-auto d-md-inline-block d-none">
				<span class="d-flex align-items-center gap-0-5">
					<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
					<img src="@app/assets/images/icons/answers.svg" alt="" class="icons">
				</span>
			</div>
			<div class="col-12 pt-1 pb-0 px-0 d-flex flex-row flex-wrap d-md-none">
				<div class="d-flex align-items-center flex-row flex-wrap">
					<span v-for="tag in question.tags" :key="tag" style="padding-left: 3px;">
						<Tag :tag="tag" />
					</span>
				</div>
				<div class="ml-auto">
					<span class="d-flex align-items-center">
						<span style="padding-right: 4px;">{{ formatNumber(question.answers) }} </span>
						<img src="@app/assets/images/icons/answers.svg" alt="" class="icons">
					</span>
				</div>
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
		margin: 0 8px;
		border-radius: 50px;
	}

	.icons {
		width: 24px;
		height: 24px;
	}

	.ml-auto {
		margin-left: auto;
	}
</style>
