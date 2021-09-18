<template>
	<nav class="mobile-bottom-nav d-sm-none">
		<NuxtLink to="/">
			<div class="mobile-bottom-nav__item mobile-bottom-nav__item--active  ">
				<div class="mobile-bottom-nav__item-content">
					<img src="@app/assets/images/icons/home.svg" class="icon" alt="">
				</div>
			</div>
		</NuxtLink>

		<NuxtLink to="/sessions">
			<div class="mobile-bottom-nav__item">
				<img src="@app/assets/images/icons/questions-nav.svg" class="icon" alt="">
			</div>
		</NuxtLink>

		<NuxtLink to="/">
			<div class="mobile-bottom-nav__item">
				<img src="@app/assets/images/icons/create.svg" class="icon" alt="">
			</div>
		</NuxtLink>

		<NuxtLink to="/notifications">
			<div class="mobile-bottom-nav__item">
				<img src="@app/assets/images/icons/notification-outline.svg" class="icon" alt="">
			</div>
		</NuxtLink>

		<NuxtLink to="/">
			<div class="mobile-bottom-nav__item">
				<img src="@app/assets/images/icons/apps.svg" class="icon" alt="">
			</div>
		</NuxtLink>
	</nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
	.icon {
		width: 1.25rem;
		height: 1.25rem;
		object-fit: contain;
	}

	.mobile-bottom-nav {
		color: $color-dark;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		will-change: transform;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;

		// box-shadow: 0 -2px 5px -2px #333;
		background-color: #fff;

		&__item {
			text-align: center;
			font-size: 1.25rem;
			justify-content: center;
		}

		&__item--active {
			//dev
			color: red;
		}

		&__item-content {
			display: flex;
			flex-direction: column;
		}
	}
</style>
