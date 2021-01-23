<template>
	<div class="full">
		<div class="body pt-2 px-2">
			<div class="head">
				<div class="d-flex justify-content-between align-items-center top">
					<h3 class="font-weight-bold mb-0">
						<slot name="header" />
					</h3>
					<a class="close mr-2" @click.prevent="close">
						<img src="@/assets/images/icons/close.svg" alt="" width="20" height="20">
					</a>
				</div>
				<div class="links d-flex justify-content-around align-items-center mt-3 mb-2">
					<a :class="{'active': name === 'notifications'}">
						<img src="@/assets/images/icons/notification.svg" alt="">
					</a>
					<a :class="{'active': name === 'messages'}">
						<img src="@/assets/images/icons/chat.svg" alt="">
					</a>
					<a :class="{'active': name === 'friends'}">
						<img src="@/assets/images/icons/friends.svg" alt="">
					</a>
				</div>
				<div class="my-2 bg-light-grey mx-n2" style="height: 5px;" />
			</div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Navigation',
	props: {
		name: {
			required: true,
			type: String
		},
		close: {
			type: Function,
			required: true
		}
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
	background: $color-black-transparent;
	overflow-y: auto;
	.body {
		width: 100%;
		height: 100%;
		background: $color-white;
		animation: expand .25s;
	}
	.head {
		.top {
			img { filter: brightness(10%); }
		}
		.links {
			.active {
				background: $color-light-grey;
				border-radius: 10rem;
				padding: 0.5rem;
				img {
					filter: brightness(200%);
					width: 24px;
					height: 24px;
				}
			}
			img {
				width: 20px;
				height: 20px;
			}
		}
	}
}
@keyframes expand {
	from {
		width: 0;
		height: 0;
		position: fixed;
		left: 50%;
		top: 50%;
	}
	to {
		width: 100%;
		height: 100%;
		position: relative;
		left: 0;
		top: 0;
	}
}
</style>
