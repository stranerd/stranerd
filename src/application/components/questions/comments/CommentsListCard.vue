<template>
	<div :id="comment.id" class="my-0-5 d-flex align-items-start gap-0-5">
		<NuxtLink :to="`/users/${comment.userId}`">
			<Avatar :src="comment.avatar" :size="35" />
		</NuxtLink>
		<div>
			<NuxtLink :to="`/users/${comment.userId}`" class="d-block text-wrap fw-bold text-sub">
				<DynamicText>
					{{ comment.userName }}
				</DynamicText>
			</NuxtLink>
			<DynamicText>
				{{ comment.body }}
			</DynamicText>
		</div>
		<DynamicText class="ms-auto">
			{{ formatTime(comment.createdAt) }}
		</DynamicText>
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
