<template>
	<div>
		<div class="d-flex align-items-start mb-1">
			<NuxtLink :to="`/users/${question.userId}`">
				<img :src="question.avatar" alt="" class="profile-image">
			</NuxtLink>
			<div class="mx-1">
				<NuxtLink :to="`/users/${question.userId}`" class="d-block text-red font-weight-bold text-wrap">
					<span>{{ question.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ time }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ml-auto">
				<Coins :size="20" style="z-index:1;" />
				<span class="rounded-pill ml-n2 pr-1 border border-grey small" style="padding-left: 1.25rem;">
					+{{ formatNumber(question.creditable) }}
				</span>
			</div>
		</div>
		<NuxtLink :to="`/questions/${question.id}`" class="mb-1 editor-body lead" v-html="question.body" />
		<div>
			<span v-if="question.attachments.length" class="mr-2">
				<span>{{ question.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<NuxtLink v-if="question.answers > 0" :to="`/questions/${question.id}`" class="mr-2">
				<span>{{ question.answers }}</span>
				<i class="fas fa-newspaper" />
			</NuxtLink>
			<span v-if="question.commentsCount > 0" class="mr-2">
				<span>{{ question.commentsCount }}</span>
				<i class="fas fa-comments" />
			</span>
		</div>
		<DisplayAttachments v-if="question.attachments.length" id="attachments" :attachments="question.attachments" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTimeDifference } from '@app/hooks/core/dates'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'QuestionCommentPageCard',
	components: { DisplayAttachments },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { subject } = useSubject(props.question.subjectId)
		const { time, startTimer, stopTimer } = useTimeDifference(props.question.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { subject, time, formatNumber }
	}
})
</script>
