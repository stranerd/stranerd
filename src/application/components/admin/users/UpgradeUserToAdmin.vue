<template>
	<div>
		<h4 class="text-muted mb-2">
			Add New Admin
		</h4>
		<div class="d-flex align-items-center">
			<input v-model="email" type="email" class="form-control flex-grow-1" placeholder="Enter user's email address">
			<a @click.prevent="reset">
				<i class="fas fa-trash mx-2 text-danger" />
			</a>
		</div>
		<button class="btn mx-0 px-2 btn-primary my-2" :disabled="!email" @click="getUsersByEmail">
			Find User
		</button>
		<div v-if="fetched" class="mt-1">
			<p v-if="users.length === 0" class="text-danger opacity-75">
				No user with such email exists
			</p>
			<div v-for="user in users" :key="user.id" class="mb-3">
				<div class="d-flex flex-wrap justify-content-between align-items-center">
					<div class="text-truncate mb-1">
						<p class="lead mb-0 text-wrap">
							{{ user.name }}
						</p>
						<p class="small mb-0 text-wrap">
							{{ user.email }}
						</p>
					</div>
					<span v-if="user.roles.isAdmin" class="text-nowrap text-danger">
						Already an admin
					</span>
					<button v-else class="btn btn-sm text-nowrap btn-success" @click="adminUser(user)">
						Make admin
					</button>
				</div>
			</div>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
		<hr>
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
