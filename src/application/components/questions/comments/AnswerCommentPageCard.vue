<template>
	<div>
		<div class="d-flex align-items-start my-1">
			<NuxtLink :to="`/users/${answer.userId}`">
				<img :src="answer.user.image.link" alt="" class="profile-image">
			</NuxtLink>
			<div class="mx-1">
				<NuxtLink :to="`/users/${answer.userId}`" class="d-block text-red font-weight-bold text-wrap">
					<span>{{ answer.user.name.fullName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ time }}
				</span>
			</div>
			<ShowRatings class="ml-auto my-auto" :rating="answer.ratings" />
		</div>
		<NuxtLink :to="`/questions/${answer.questionId}#${answer.id}`" class="my-1 lead editor-body" v-html="answer.body" />
		<div class="my-1 d-flex flex-wrap icons">
			<span v-if="answer.attachments.length" class="mr-2">
				<span>{{ answer.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<span class="mr-2">
				<span>{{ answer.commentsCount }}</span>
				<i class="fas fa-comments" />
			</span>
			<span class="mr-2 text-red">
				<i class="fas fa-heart" />
				<span>LIKES {{ answer.likes }}</span>
			</span>
			<span v-if="answer.best" class="mr-1 text-accent">
				<span>Best Answer</span>
			</span>
		</div>
		<DisplayAttachments v-if="answer.attachments.length" id="attachments" :attachments="answer.attachments" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import DisplayAttachments from '@app/components/questions/DisplayAttachments.vue'
export default defineComponent({
	name: 'AnswerCommentPageCard',
	components: {
		ShowRatings,
		DisplayAttachments
	},
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},
	setup (props) {
		const { time, startTimer, stopTimer } = useTimeDifference(props.answer.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { time }
	}
})
</script>

<style lang="scss" scoped>
.icons {
	font-size: 14px;
	font-weight: 600;
}
</style>
