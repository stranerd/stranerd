<template>
	<div>
		<div class="d-flex align-items-center mb-2">
			<NuxtLink :to="`/users/${question.userId}`">
				<Avatar :src="question.avatar" :size="50" />
			</NuxtLink>
			<div class="mx-1 mr-auto">
				<NuxtLink :to="`/users/${question.userId}`" class="d-block font-weight-bold text-wrap">
					<span>{{ question.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ time }}
				</span>
			</div>
			<div class="d-none d-md-inline">
				<div class="d-flex">
					<div v-if="isTutor" class="d-flex align-items-center position-relative mr-1">
						<span class="rounded-pill px-1 pr-3 bg-blue-grey text-light-blue">
							+{{ formatNumber(question.creditable) }}
						</span>
						<Coins :size="24" class="ml-n2" style="z-index:1;" />
					</div>
					<span class="mr-1">
						<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 24px; height: 24px;">
						<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
					</span>
				</div>
			</div>
			<button v-if="showAnswerButton" class="btn btn-outline-blue rounded-pill ml-1 px-3 py-half" @click="openAnswerModal">
				Answer
			</button>
			<i v-if="question.isAnswered" class="fas fa-check text-green fa-2x" />
		</div>
		<div class="thick mx-n1 mx-md-n3 mx-lg-n4" />
		<div class="mb-2 editor-body lead" v-html="question.body" />
		<div class="d-flex">
			<span class="mr-1 mr-md-2 d-md-none">
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 24px; height: 24px;">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
			</span>
			<span v-if="question.attachments.length" class="mr-1 mr-md-2">
				<span>{{ formatNumber(question.attachments.length) }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<a v-if="question.commentsCount" class="mr-1 mr-md-2 d-flex align-items-center" @click.prevent="showComments = !showComments">
				<span>
					{{ showComments ? 'Hide' : 'Show' }} Comments
				</span>
				<i class="fas mx-half" :class="showComments ? 'fa-angle-up' : 'fa-angle-down'" />
			</a>
			<div v-if="isTutor" class="d-md-none d-flex align-items-center position-relative ml-auto">
				<span class="rounded-pill px-1 pr-3 bg-blue-grey text-light-blue">
					+{{ formatNumber(question.creditable) }}
				</span>
				<Coins :size="24" class="ml-n2" style="z-index:1;" />
			</div>
		</div>
		<template v-if="question.attachments.length">
			<div class="thick mx-n1 mx-md-n3 mx-lg-n4" />
			<DisplayAttachments id="attachments" :attachments="question.attachments" />
		</template>
		<div class="thick mx-n1 mx-md-n3 mx-lg-n4" />
		<div v-if="showComments">
			<div class="d-flex align-items-end mb-1">
				<h5 class="mb-0 mr-1">
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
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTimeDifference } from '@app/hooks/core/dates'
import { openAnswerModal } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
import CommentForm from '@app/components/questions/comments/QuestionCommentForm.vue'
import CommentList from '@app/components/questions/comments/QuestionCommentsList.vue'
import { formatNumber, pluralize } from '@utils/numbers'
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
		const { time, startTimer, stopTimer } = useTimeDifference(props.question.createdAt)
		const showAnswerButton = computed({
			get: () => isTutor.value && props.question.userId !== id.value && !props.question.isAnswered && !user.value?.meta.answeredQuestions[props.question.id],
			set: () => {}
		})
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return {
			id, formatNumber, pluralize, isTutor, showAnswerButton,
			subject, time, showComments,
			openAnswerModal: () => {
				if (!isLoggedIn.value) redirect()
				else openAnswerModal(props.question)
			}
		}
	}
})
</script>
