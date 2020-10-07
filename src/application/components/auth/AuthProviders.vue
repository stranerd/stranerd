<template>
	<div class="grid">
		<button class="btn-facebook btn btn-auth">
			<img src="@/assets/images/auth/facebook.png" alt="Facebook">Facebook
		</button>
		<button class="btn-google btn btn-auth">
			<img src="@/assets/images/auth/google.png" alt="Google">Google
		</button>
	</div>
</template>

<style lang="scss" scoped>
.grid{
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
}
@media (min-width: $sm) {
	.grid{ grid-template-columns: repeat(2, 1fr);}
}
.btn-auth{
	color: #fff;
	width: 100%;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
	transition: all 0.4s;
	z-index: 1;
	img {
		height: 30px;
		margin-right: .5rem;
	}
}
.btn-auth:hover {
	background: $white;
	color: $black;
}
.btn-facebook { background-color: #3b5998; }
.btn-google { background-color: lighten(#db4437, 10%); }
</style>
