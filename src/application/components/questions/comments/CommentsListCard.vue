<template>
	<div :id="comment.id" class="my-1 d-flex align-items-center flex-wrap">
		<NuxtLink :to="`/users/${comment.userId}`">
			<Avatar :src="comment.avatar" :size="35" />
		</NuxtLink>
		<div class="mx-1">
			<NuxtLink :to="`/users/${comment.userId}`" class="d-block fw-bold text-wrap">
				<span>{{ comment.userName }}</span>
			</NuxtLink>
		</div>
		<p class="me-1 mb-0 text-wrap">
			{{ comment.body }}
		</p>
		<span class="ms-auto">
			{{ formatTime(comment.createdAt) }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { CommentEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			required: true,
			type: Object as PropType<CommentEntity>
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>
