<template>
	<div :id="comment.id" class="my-1 d-flex align-items-center flex-wrap">
		<NuxtLink :to="`/users/${comment.userId}`">
			<img :src="comment.avatar" alt="" class="profile-image" style="width: 35px;height: 35px;">
		</NuxtLink>
		<div class="mx-1">
			<NuxtLink :to="`/users/${comment.userId}`" class="d-block font-weight-bold text-wrap">
				<span>{{ comment.userName }}</span>
			</NuxtLink>
		</div>
		<p class="mb-0">
			{{ comment.body }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, /* onBeforeUnmount, onMounted, */ PropType } from '@nuxtjs/composition-api'
import { CommentEntity } from '@modules/questions'
// import { useTimeDifference } from '@app/hooks/core/dates'
export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			required: true,
			type: Object as PropType<CommentEntity>
		}
	}/*,
	 setup (props) {
		const { time, startTimer, stopTimer } = useTimeDifference(props.comment.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { time }
	} */
})
</script>
