<template>
	<form @submit.prevent="submit">
		<div class="form-group my-1">
			<div class="d-flex align-items-center">
				<img :src="isLoggedIn ? user.image : DEFAULT_IMAGE_URL" alt="" class="mr-1" :class="isCommentsPage ? 'profile-image' : 'profile-image-sm'">
				<input
					v-model="factory.body"
					class="form-control form-control-sm flex-grow-1"
					placeholder="Add a comment..."
					:class="{'is-invalid': factory.errors.body, 'is-valid': factory.isValid('body'), 'form-control-small': !isCommentsPage}"
				>
			</div>
			<small v-if="factory.errors.body" class="small text-danger d-block">{{ factory.errors.body }}</small>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { CommentFactory } from '@modules/questions'
import { useAuth } from '@app/hooks/auth/auth'
import { DEFAULT_IMAGE_URL } from '@modules/users/domain/entities/user'
export default defineComponent({
	name: 'CommentForm',
	props: {
		factory: {
			type: CommentFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup () {
		const { isLoggedIn, user } = useAuth()
		const isCommentsPage = useContext().route.value.path.includes('comments')
		return { isLoggedIn, user, isCommentsPage, DEFAULT_IMAGE_URL }
	}
})
</script>

<style lang="scss" scoped>
.form-control-small {
	font-size: 1rem;
	min-height: 0;
	padding: 1.25rem 1rem;
}
</style>
