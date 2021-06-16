<template>
	<div class="full">
		<div class="under" @click="close" />
		<div class="sidebar">
			<div class="py-0-5 px-1 my-5 d-flex bg-blue align-items-center justify-content-center gap-0-5">
				<!-- <a @click.prevent="close">
					<img src="@app/assets/images/icons/close.svg" alt="" width="16" height="16" style="filter: brightness(200%);">
				</a> -->
				<NuxtLink class="d-lg-none logo" to="/">
					<Logo />
				</NuxtLink>
			</div>
			<!-- <div class="thick mt-0" /> -->
			<div class="px-0-5 d-flex flex-column flex-grow-1">
				<slot />
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
.logo{
	margin: 31px 0px;
}
.full {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: vh(100);
	z-index: 1;
	background: rgba($color-blue-grey, .5);
	overflow-y: auto;
	.under {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: vh(100);
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		box-shadow: 3px 0 12px rgba($color-black, 1);
		width: clamp(288px, 75%, 300px);
		min-height: vh(100);
		color: $color-light-blue;
		background: $color-blue;
		position: absolute;
		top: 0;
		left: 0;
		animation: slide-right .25s;
	}
}
@keyframes slide-right {
	from { left: -100px; }
	to { left: 0; }
}
</style>
