<template>
	<div class="full">
		<div class="sidebar">
			<div class="pt-1 px-2 d-flex bg-blue align-items-center">
				<a class="me-2" @click.prevent="close">
					<img src="@app/assets/images/icons/close.svg" alt="" width="16" height="16" style="filter: brightness(200%);">
				</a>
				<NuxtLink class="d-lg-none" to="/">
					<Logo />
				</NuxtLink>
			</div>
			<div class="thick" />
			<div class="px-1">
				<slot />
			</div>
			<div v-if="isLoggedIn" class="mt-auto">
				<div class="thick mb-0" />
				<a class="logout" @click="signout">
					<PageLoading v-if="loading" />
					<img src="@app/assets/images/icons/signout.svg" alt="">
					<span>Signout</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'SideMenu',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { isLoggedIn } = useAuth()
		const { loading, signout } = useSessionSignout()
		return { isLoggedIn, loading, signout }
	}
})
</script>

<style lang="scss" scoped>
.full {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1;
	background: rgba($color-blue-grey, .5);
	overflow-y: auto;
	.sidebar {
		display: flex;
		flex-direction: column;
		box-shadow: 3px 0 12px rgba($color-black, 1);
		width: clamp(200px, 75%, 300px);
		min-height: 100vh;
		color: $color-light-blue;
		background: $color-blue;
		position: relative;
		animation: slide-right .25s;
	}
}
@keyframes slide-right {
	from { left: -100px; }
	to { left: 0; }
}
.logout {
	color: $color-light-blue;
	padding: 0.75rem 1.5rem;
	display: flex;
	align-items: center;
	font-weight: 500;
	img {
		height: 24px;
		width: 24px;
	}
	span {
		font-size: 18px;
		margin-left: 0.75rem;
	}
}
</style>
