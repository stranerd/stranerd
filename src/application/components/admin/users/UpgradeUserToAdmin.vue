<template>
	<div class="my-3 bg-white p-3 shadow-sm rounded-lg">
		<h4 class="text-muted mb-2">
			Upgrade User to Admin
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
		<div v-if="fetched && !loading" class="mt-1">
			<p v-if="users.length === 0" class="text-danger opacity-75">
				No user with such email exists
			</p>
			<div v-for="user in users" :key="user.id" class="my-2">
				<div class="d-flex flex-wrap justify-content-between align-items-center">
					<div class="text-truncate">
						<p class="lead mb-1 text-wrap">
							{{ user.name }}
						</p>
						<p class="small mb-0 text-wrap">
							{{ user.email }}
						</p>
					</div>
					<button v-if="user.roles.isAdmin" class="btn-sm mx-0 text-nowrap btn-danger" @click="deAdminUser(user)">
						Remove admin
					</button>
					<button v-else class="btn-sm mx-0 text-nowrap btn-success" @click="adminUser(user)">
						Make admin
					</button>
				</div>
				<hr class="mt-2">
			</div>
		</div>
		<p v-if="error" class="text-danger">
			{{ error }}
		</p>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAdminRoles } from '@app/usecases/users/roles'
export default defineComponent({
	setup () {
		const {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, deAdminUser, reset
		} = useAdminRoles()
		return {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, deAdminUser, reset
		}
	}
})
</script>
