<template>
	<div>
		<h2>Add New Admin</h2>
		<form @submit.prevent="getUsersByEmail">
			<div class="d-flex align-items-center">
				<input v-model="email" type="email" autocomplete="email" class="form-control flex-grow-1" placeholder="Enter user's email address">
				<a @click.prevent="reset">
					<i class="fas fa-trash mx-1 text-danger" />
				</a>
			</div>
			<button class="btn mx-0 px-1 btn-dark my-1" :disabled="!email">
				Find User
			</button>
		</form>
		<div v-if="fetched" class="mt-0-5">
			<DisplayError v-if="users.length === 0" error="No user with such email exists" />
			<div v-for="user in users" :key="user.hash" class="mb-1-5">
				<div class="d-flex flex-wrap justify-content-between align-items-center">
					<div class="text-truncate mb-0-5">
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
			</div>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
		<div class="thick mx-n2" />
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
