<template>
	<div>
		<div class="text-center my-2">
			<img src="@/assets/images/stranerd_logo.png" height="50" alt="Stranerd">
		</div>
		<div v-if="isLoggedIn" class="d-flex flex-column align-items-center my-2">
			<img :src="user.image" alt="" class="profile-image" style="width:90px;height:90px;">
			<span class="text-18">{{ user.name }}</span>
			<span>
				<span>{{ user.account.credits }}</span>
				<img src="@/assets/images/icons/credits.svg" width="16" height="16" alt="">
			</span>
			<button class="btn my-2 btn-outline-accent rounded-pill px-3 py-1">
				View Profile
			</button>
		</div>
		<div class="my-2 d-flex flex-column">
			<BaseLink class="d-flex align-content-center py-1 px-2 text-grey" to="/dashboard" :root="true">
				<img src="@/assets/images/icons/dashboard.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Dashboard</span>
			</BaseLink>
			<BaseLink class="d-flex align-content-center py-1 px-2 text-grey" to="/tutors" :root="true">
				<img src="@/assets/images/icons/tutors.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Tutors</span>
			</BaseLink>
			<BaseLink class="d-flex align-content-center py-1 px-2 text-grey" to="/flashcards" :root="true">
				<img src="@/assets/images/icons/flashcards.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Flashcards</span>
			</BaseLink>
			<BaseLink class="d-flex align-content-center py-1 px-2 text-grey" to="/test-preps" :root="true">
				<img src="@/assets/images/icons/testprep.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Test Preps</span>
			</BaseLink>
			<BaseLink class="d-flex align-content-center py-1 px-2 text-grey" to="/shop" :root="true">
				<img src="@/assets/images/icons/shop.svg" alt="" width="24" height="24">
				<span class="ml-1 text-18">Shop</span>
			</BaseLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'Sidebar',
	setup () {
		const { isLoggedIn, user } = useAuth()
		return { isLoggedIn, user }
	}
})
</script>

<style lang="scss">
.nuxt-link-exact-active {
	background: lighten($color-accent, 10);
}
</style>
