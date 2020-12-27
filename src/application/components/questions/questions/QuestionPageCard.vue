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
		<div class="my-1 px-1 px-md-2 pl-2 d-flex flex-column align-items-start">
			<h6>
				<NuxtLink :to="`/questions/${question.id}/comments`">
					Comments
				</NuxtLink>
			</h6>
			<NuxtLink
				v-for="comment in question.comments"
				:id="comment.id"
				:key="comment.id"
				:to="`/questions/${question.id}/comments#${comment.id}`"
			>
				&#11044; {{ comment.body }}
			</NuxtLink>
			<CommentForm v-if="isLoggedIn" class="w-100" :question-id="question.id" />
		</div>
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
			isLoggedIn, id,
			subject, time,
			openAnswerModal: () => {
				if (!isLoggedIn.value) redirect()
				else openAnswerModal(props.question)
			}
		}
	}
})
</script>
