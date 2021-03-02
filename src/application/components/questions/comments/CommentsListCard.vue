<template>
	<div :id="comment.id" class="my-1 d-flex align-items-center flex-wrap">
		<NuxtLink :to="`/users/${comment.userId}`">
			<Avatar :src="comment.avatar" :size="35" />
		</NuxtLink>
		<div class="mx-1">
			<NuxtLink :to="`/users/${comment.userId}`" class="d-block font-weight-bold text-wrap">
				<span>{{ comment.userName }}</span>
			</NuxtLink>
		</div>
		<p class="mb-0 text-wrap">
			{{ comment.body }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { CommentEntity } from '@modules/questions'
export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			required: true,
			type: Object as PropType<CommentEntity>
		}
	}
})
</script>
