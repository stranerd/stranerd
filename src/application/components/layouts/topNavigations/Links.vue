<template>
	<div class="links d-flex">
		<NuxtLink class="link" to="/">
			<img src="@/assets/images/icons/search.svg" alt="">
		</NuxtLink>
		<NuxtLink class="link d-none d-md-inline" to="/">
			<img src="@/assets/images/icons/chat.svg" alt="">
		</NuxtLink>
		<NuxtLink class="link d-none d-md-inline" to="/">
			<img src="@/assets/images/icons/users.svg" alt="">
		</NuxtLink>
		<NuxtLink class="link" to="/">
			<img src="@/assets/images/icons/notification.svg" alt="">
		</NuxtLink>
		<NuxtLink class="link d-none d-md-inline" to="/">
			<img src="@/assets/images/icons/signout.svg" alt="">
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.links {
	.link {
		color: $color-grey;
		margin: 0 1rem;
		img {
			width: 24px;
			height: 24px;
		}
		@media (min-width: $md) {
			img {
				width: 28px;
				height: 28px;
			}
		}
		@media (min-width: $lg) {
			width: 36px;
			height: 36px;
			background: $color-white;
			border-radius: 10rem;
			margin: 0 0.5rem;
			img {
				margin: 8px;
				width: 20px;
				height: 20px;
			}
		}
	}
}
</style>
