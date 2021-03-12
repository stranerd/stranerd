<template>
	<form @submit.prevent="submitComment">
		<div class="form-group my-1">
			<div class="d-flex align-items-center">
				<Avatar :src="isLoggedIn ? user.avatar : Avatars.default.link" class="mr-1" :size="35" />
				<input
					v-model="factory.body"
					class="form-control form-control-sm form-control-small flex-grow-1"
					placeholder="Add a comment..."
					:class="{'is-invalid': factory.errors.body, 'is-valid': factory.isValid('body') }"
				>
			</div>
			<small v-if="factory.errors.body" class="small text-danger d-block">{{ factory.errors.body }}</small>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { CommentFactory } from '@modules/questions'
import { useAuth } from '@app/hooks/auth/auth'
import { Avatars } from '@modules/users'
import { useRedirectToAuth } from '@app/hooks/auth/session'
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
	setup (props) {
		const { isLoggedIn, user } = useAuth()
		const { redirect } = useRedirectToAuth()
		const submitComment = () => {
			if (isLoggedIn.value) props.submit()
			else redirect()
		}
		return { isLoggedIn, user, Avatars, submitComment }
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
