<template>
	<form @submit.prevent="submit">
		<div class="form-group my-2">
			<div class="d-flex align-items-center">
				<img v-if="isLoggedIn" :src="user.image" alt="" class="mr-1 profile-image">
				<input
					v-model="factory.body"
					class="form-control flex-grow-1"
					placeholder="Add comment..."
					:class="{'is-invalid': factory.errors.body, 'is-valid': factory.isValid('body')}"
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
		return { isLoggedIn, user }
	}
})
</script>
