<template>
	<div class="p-1">
		<template v-if="isLoggedIn">
			<ProfileHeadCard :user="user" />
			<div class="thick mx-n1" />
			<div class="d-flex flex-column">
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/dashboard-icon.svg" class="me-0-75"> Rank</span>
					<p class="fw-bold">
						#23
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/dashboard-icon.svg" class="me-0-75"> Answers</span>
					<p class="fw-bold">
						201
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/dashboard-icon.svg" class="me-0-75"> Best Answers</span>
					<p class="fw-bold">
						194
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/dashboard-icon.svg" class="me-0-75"> Sessions Hosted</span>
					<p class="fw-bold">
						68
					</p>
				</div>
				<div class="d-flex justify-content-between">
					<span><img src="@app/assets/images/icons/dashboard-icon.svg" class="me-0-75"> Member Since</span>
					<p class="fw-bold">
						May 2020
					</p>
				</div>
			</div>
			<div class="thick mx-n1" />
		</template>
		<TopUsers />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import TopUsers from '@app/components/users/rankings/TopUsers.vue'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'RightSidebar',
	components: { TopUsers, ProfileHeadCard },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		return { id, isLoggedIn, user }
	}
})
</script>
