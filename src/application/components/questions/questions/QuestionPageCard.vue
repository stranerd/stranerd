<template>
	<div>
		<div class="d-flex align-items-start mb-1">
			<NuxtLink :to="`/users/${question.userId}`">
				<img :src="question.user.image.link" alt="" class="profile-image">
			</NuxtLink>
			<div class="mx-1">
				<NuxtLink :to="`/users/${question.userId}`" class="d-block text-red font-weight-bold text-wrap">
					<span>{{ question.user.name }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ time }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ml-auto">
				<Credits :size="20" style="z-index:1;" />
				<span class="rounded-pill ml-n2 pr-1 border border-grey small" style="padding-left: 1.25rem;">
					+{{ formatNumber(question.creditable) }}
				</span>
			</div>
		</div>
		<div class="mb-1 editor-body lead" v-html="question.body" />
		<div>
			<span v-if="question.attachments.length" class="mr-2">
				<span>{{ question.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<a v-if="question.answers > 0" href="#answers" class="mr-2">
				<span>{{ question.answers }}</span>
				<i class="fas fa-newspaper" />
			</a>
		</div>
		<DisplayAttachments v-if="question.attachments.length" id="attachments" :attachments="question.attachments" />
		<hr class="thick">
		<div class="d-flex justify-content-center my-1">
			<template v-if="question.userId === id">
				<span v-if="question.isAnswered" class="mb-0 h5 text-accent">
					Answer selected
				</span>
				<span v-else-if="question.answers > 0" class="mb-0 h5 text-accent">
					Select an answer
				</span>
				<span v-else class="mb-0 h5 text-accent">
					No answers yet.
				</span>
			</template>
			<template v-else>
				<button v-if="!question.isAnswered" id="answer" class="btn rounded-pill py-1 px-4 btn-accent text-white" @click="openAnswerModal">
					Add Answer
				</button>
				<span v-else class="mb-0 h5 text-accent">
					Already Answered
				</span>
			</template>
		</div>
		<hr class="thick">
		<NuxtLink :to="`/questions/${question.id}/comments#add`" class="text-decoration-none">
			<div class="d-flex align-items-end">
				<h5 class="mb-0 mr-1">
					Comments
				</h5>
				<span>{{ question.commentsCount }}</span>
			</div>
			<CommentForm class="w-100" :question-id="question.id" />
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTimeDifference } from '@app/hooks/core/dates'
import { openAnswerModal } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
import CommentForm from '@app/components/questions/comments/QuestionCommentForm.vue'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'QuestionPageCard',
	components: { DisplayAttachments, CommentForm },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { isLoggedIn, id } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { subject } = useSubject(props.question.subjectId)
		const { time, startTimer, stopTimer } = useTimeDifference(props.question.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return {
			id, formatNumber,
			subject, time,
			openAnswerModal: () => {
				if (!isLoggedIn.value) redirect()
				else openAnswerModal(props.question)
			}
		}
	}
})
</script>
