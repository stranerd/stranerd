<template>
	<div>
		<div class="d-flex align-items-center mb-1 gap-0-5">
			<NuxtLink :to="`/users/${question.userId}`">
				<Avatar :src="question.avatar" :size="50" />
			</NuxtLink>
			<div class="me-auto">
				<NuxtLink :to="`/users/${question.userId}`" class="d-block fw-bold text-wrap">
					<span>{{ question.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ formatTime(question.createdAt) }}
				</span>
			</div>
			<div class="d-none d-md-inline">
				<div class="d-flex gap-0-5">
					<div v-if="isTutor" class="d-flex align-items-center position-relative">
						<span class="rounded-pill px-0-5 pe-1-5 bg-blue-grey text-light-blue">
							+{{ formatNumber(question.creditable) }}
						</span>
						<Coins :size="24" class="ms-n1" style="z-index:1;" />
					</div>
					<span>
						<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 24px; height: 24px;">
						<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
					</span>
				</div>
			</div>
			<button v-if="showAnswerButton" class="btn btn-outline-blue rounded-pill ms-0-5 px-1-5 py-0-25" @click="openAnswerModal">
				Answer
			</button>
			<i v-if="question.isAnswered" class="fas fa-check text-success fa-2x" />
		</div>
		<div class="thick mx-n0-5 mx-md-n1-5 mx-lg-n2" />
		<div class="mb-1 editor-body lead" v-html="question.body" />
		<div class="d-flex">
			<span class="me-0-5 me-md-1 d-md-none">
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 20px; height: 20px;">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
			</span>
			<span v-if="question.attachments.length" class="me-0-5 me-md-1">
				<span>{{ formatNumber(question.attachments.length) }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<a v-if="question.commentsCount" class="me-0-5 me-md-1 d-flex align-items-center" @click.prevent="showComments = !showComments">
				<span>
					{{ showComments ? 'Hide' : 'Show' }} Comments
				</span>
				<i class="fas mx-0-25" :class="showComments ? 'fa-angle-up' : 'fa-angle-down'" />
			</a>
			<div v-if="isTutor" class="d-md-none d-flex align-items-center position-relative ms-auto">
				<span class="rounded-pill px-0-5 pe-1-5 bg-blue-grey text-light-blue">
					+{{ formatNumber(question.creditable) }}
				</span>
				<Coins :size="24" class="ms-n1" style="z-index:1;" />
			</div>
		</div>
		<template v-if="question.attachments.length">
			<div class="thick mx-n0-5 mx-md-n1-5 mx-lg-n2" />
			<DisplayAttachments id="attachments" :attachments="question.attachments" />
		</template>
		<div class="thick mx-n0-5 mx-md-n1-5 mx-lg-n2" />
		<div v-if="showComments">
			<div class="d-flex align-items-end mb-0-5">
				<h5 class="mb-0 me-0-5">
					Comments
				</h5>
				<span>{{ formatNumber(question.commentsCount) }}</span>
			</div>
			<CommentList :question-id="question.id" />
		</div>
		<CommentForm class="w-100" :question-id="question.id" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { openAnswerModal } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
import CommentForm from '@app/components/questions/comments/QuestionCommentForm.vue'
import CommentList from '@app/components/questions/comments/QuestionCommentsList.vue'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'QuestionPageCard',
	components: { DisplayAttachments, CommentForm, CommentList },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const showComments = ref(false)
		const { isLoggedIn, id, isTutor, user } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { subject } = useSubject(props.question.subjectId)
		const showAnswerButton = computed({
			get: () => isTutor.value && props.question.userId !== id.value && !props.question.isAnswered && !user.value?.meta.answeredQuestions[props.question.id],
			set: () => {}
		})
		return {
			id, formatNumber, pluralize, isTutor, showAnswerButton,
			subject, formatTime, showComments,
			openAnswerModal: () => {
				if (!isLoggedIn.value) redirect()
				else openAnswerModal(props.question)
			}
		}
	}
})
</script>
