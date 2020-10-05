<template>
	<div class="body w-100 d-flex justify-content-center align-items-center flex-wrap">
		<div class="content pt-8 pb-4 px-2 px-sm-8">
			<Nuxt />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.body{
		min-height: 100vh;
		background: url('../assets/images/auth/bg.jpg') center no-repeat;
		background-size: cover;
	}
	.content{
		width: 100%;
		max-width: 720px;
		background: $white;
	}
	@media (min-width: $sm) {
		.body{ padding: 1rem; }
		.content { border-radius: .75rem; }
	}
	@media (min-width: $md) {
		.content {
			padding-left: 7rem;
			padding-right: 7rem;
		}
	}
</style>
