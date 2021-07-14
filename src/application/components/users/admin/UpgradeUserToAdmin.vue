<template>
	<div class="d-flex flex-column gap-1">
		<form class="d-flex flex-row align-items-center" @submit.prevent="getUsersByEmail">
			<div class="flex-grow-1">
				<input
					id="email"
					v-model="email"
					name="subject_name"
					required
					placeholder="Enter user's email address"
					class="form-control py-1 px-1"
					autocomplete="email"
				>
			</div>
			<button class="btn btn-lg btn-custom btn-block py-1 px-md-3 px-1 ms-auto" type="submit">
				<span class="d-none d-md-inline-block">Find User</span>
				<span style="font-size:13px;width:80px;" class="d-inline-block d-md-none">Find User</span>
			</button>
		</form>
		<div v-if="fetched" class="d-flex flex-column gap-1">
			<DisplayError v-if="users.length === 0" error="No user with such email exists" />
			<div v-for="user in users" :key="user.hash" class="d-flex flex-wrap justify-content-between gap-0-5 align-items-center">
				<div class="text-truncate">
					<p class="lead mb-0 text-wrap">
						{{ user.fullName }}
					</p>
					<p class="small mb-0 text-wrap">
						{{ user.email }}
					</p>
				</div>
				<span v-if="user.roles.isAdmin" class="text-danger">
					Already an admin
				</span>
				<button v-else class="btn btn-sm btn-success" @click="adminUser(user)">
					Make admin
				</button>
			</div>
			<hr class="my-0">
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAdminRoles } from '@app/hooks/users/roles/admins'
export default defineComponent({
	setup () {
		const {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, reset
		} = useAdminRoles()
		return {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, reset
		}
	}
})
</script>
<style lang="scss" scoped>
	input {
		border: 1px solid $color-line;
		border-radius: 6px;
		font-size: 16px;
		background-color: $color-tags;
		width: 100%;
		color: grey;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: #fff;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}
</style>
