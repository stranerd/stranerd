<template>
	<div>
		<div class="d-flex align-items-start mb-1">
			<img :src="question.user.image.link" alt="" class="profile-image">
			<div class="mx-1">
				<span class="d-block text-red font-weight-bold text-wrap">
					{{ question.user.name }}
				</span>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ time }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ml-auto">
				<Credits :size="20" style="z-index:1;" />
				<span class="rounded-pill ml-n2 pr-1 border border-grey small" style="padding-left: 1.25rem;">
					+{{ question.creditable }}
				</span>
			</div>
		</div>
		<div class="mb-1 editor-body" v-html="question.body" />
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
export default defineComponent({
	name: 'QuestionPageCard',
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
		return { subject, time }
	}
})
</script>
