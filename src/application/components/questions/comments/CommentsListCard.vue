<template>
	<div :id="comment.id">
		<div class="mb-1 d-flex align-items-start">
			<img :src="comment.user.image.link" alt="" class="profile-image">
			<div class="mx-1">
				<span class="d-block text-red font-weight-bold text-wrap">
					{{ comment.user.name }}
				</span>
				<span class="small text-wrap">
					{{ time }}
				</span>
			</div>
		</div>
		<p>{{ comment.body }}</p>
		<hr>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { CommentEntity } from '@modules/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			required: true,
			type: Object as PropType<CommentEntity>
		}
	},
	setup (props) {
		const { time, startTimer, stopTimer } = useTimeDifference(props.comment.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { time }
	}
})
</script>
