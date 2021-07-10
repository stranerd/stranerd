<template>
	<div>
		<div class="d-flex flex-column align-items-center">
			<h1>Edit Your Profile</h1>
			<Avatar :src="user.avatar" :size="150" />

			<form class="form d-flex flex-column">
				<label id="uploadbtn" for="picture" class="px-3 bg-tags mt-3 text-main border border-line text-center">Upload New Profile Picture</label>
				<input
					id="picture"
					class="d-none"
					type="file"
					name="file"
					accept="image/*"
				></input>
				<input
					class="px-1 py-1 bg-white mt-1 text-sub"
					type="text"
					name="Username"
					placeholder="Username"
				></input>
				<input
					class="px-1 py-1 bg-white mt-1 text-sub"
					type="text"
					name="First name"
					placeholder="First name"
				></input>
				<input
					class="px-1 py-1 bg-white mt-1 text-sub"
					type="text"
					name="Last name"
					placeholder="Last name"
				></input>
				<input
					class="px-1 py-1 bg-white mt-1 text-sub"
					type="email"
					name="E-mail"
					placeholder="E-mail"
				></input>
				<textarea
					class="px-2 py-1 bg-white mt-1 text-sub"
					type="text"
					name="Description"
					placeholder="Write a short description about yourself."
				/>

				<div class="d-flex justify-content-center mt-1-5">
					<button class="bg-danger">
						Cancel
					</button>
					<button class="bg-main-blue">
						Save
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'NotificationsPage',
	layout: 'default',
	middleware: ['isAuthenticated'],
	setup () {
		const { user } = useAuth()
		return { user }
	}
	// method: {
	// 	    update (evt:any) {
	// 		const input = evt.currentTarget.value.split('\\').pop()
	// 		this.title = input
	// 	}
	// }
})
</script>

<style lang="scss" scoped>
label{
	width:42rem;
	box-sizing: border-box;
	border-radius:0.375rem;
	border: 1px solid $color-line;
	font-size: 1.125rem;
	text-align: center;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
input{
	width:42rem;
	border-radius:0.375rem;
	border: 1px solid $color-line;
	font-size: 1.125rem;
	outline:none;
	height: 3rem;
	padding-left: 24px !important;
}
textarea{
	width:42rem;
	border-radius:0.375rem;
	border: 1px solid $color-line;
	font-size: 1.125rem;
	outline:none;
	height: 7.5rem;
	padding-left: 24px !important;
}
button{
	height: 3.75rem;
	width: 9.375rem;
	display: grid;
	place-items: center;
	outline: none;
	border-radius: 6px;
	border: none;
	font-size: 24px;
	color: white;
	margin: 0px 12px;
}
</style>
