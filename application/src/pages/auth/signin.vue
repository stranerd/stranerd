<template>
	<form>
		<h2 class="mb-7 text-center">Sign In With</h2>
		<div class="row mb-4">
			<div class="col-sm-6">
				<button class="btn-facebook btn btn-auth mb-3">
					<img src="@/assets/images/auth/facebook.png" alt="Facebook">Facebook
				</button>
			</div>
			<div class="col-sm-6">
				<button class="btn-google btn btn-auth mb-3">
					<img src="@/assets/images/auth/google.png" alt="Google">Google
				</button>
			</div>
		</div>
		<div class="form-group">
			<label for="email" class="label">Email</label>
			<input type="email" id="email" class="form-control">
		</div>
		<div class="form-group">
			<label class="label">
				<span>Password</span>
				<a href="#" class="label-sm ml-1">
					Forgot?
				</a>
			</label>
			<input type="password" id="password" class="form-control">
		</div>
		<div class="mt-2">
			<button class="w-100 btn btn-dark py-2">Sign In</button>
		</div>
		<div class="text-center mt-4">
			<span class="label-sm">Not a member?</span>
			<a href="https://colorlib.com/etc/lf/Login_v5/index.html#" class="label-sm">
				Sign up now
			</a>
		</div>
	</form>
</template>

<script>
export default {
	layout: 'auth'
}
</script>

<style lang="scss" scoped>
h2{
	font-size: 2.5rem;
	color: $black;
	line-height: 1.2;
}
.btn-auth{
	width: 100%;
	font-size: 18px;
	line-height: 1.2;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
	transition: all 0.4s;
	position: relative;
	z-index: 1;
	img {
		width: 30px;
		margin-right: .5rem;
	}
}
.btn-auth::before{
	content: "";
	display: block;
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
	border-radius: 10px;
	top: 0;
	left: 0;
	background: #a64bf4;
	background: linear-gradient(45deg, #00b2de, #e600da);
	opacity: 0;
	transition: all 0.4s;
}
.btn-auth:hover { color: $white; }
.btn-auth:hover:before { opacity: 1;}
.btn-facebook {
	color: #fff;
	background-color: #3b5998;
}
.btn-google {
	color: #555555;
	background-color: #fff;
}
</style>
