<template>
	<div class="body w-100 d-flex justify-content-center align-items-center flex-wrap p-1">
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
		border-radius: .75rem;
		position: relative;
	}
	@media (min-width: 768px) {
		.content {
			padding-left: 7rem;
			padding-right: 7rem;
		}
	}
</style>
