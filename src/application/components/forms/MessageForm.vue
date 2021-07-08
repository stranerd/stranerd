<template>
	<form style="width: 100%;" class="formStyle d-flex flex-column py-2 px-2" @submit.prevent="createMessage">
		<div class="mb-1" style="border-bottom: 1px solid #c5c5c5;">
			<h3 style="color: #000;">
				Contact Us
			</h3>
		</div>

		<div class="col-12 py-0 px-0 d-flex flex-row flex-wrap" style="align-items: center;">
			<div class="col-lg-5 col-12 d-flex flex-column mb-1 mb-lg-0">
				<div>
					<sup style="color: red;">*</sup><span class="formLabel">First Name</span>
				</div>
				<div>
					<input
						id="first_name"
						v-model="factory.first_name"
						class="form-control"
						placeholder="John"
						:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}"
					>
				</div>
			</div>
			<div class="col-lg-2 d-none d-lg-block" />
			<div class="col-lg-5 col-12 d-flex flex-row">
				<div class="d-flex flex-column ml-auto" style="width: 100%;">
					<div>
						<sup style="color: red;">*</sup><span class="formLabel">Last Name</span>
					</div>
					<div>
						<input
							id="last_name"
							v-model="factory.last_name"
							class="form-control"
							placeholder="Smith"
							:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}"
						>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 py-1 px-0 d-flex flex-row" style="align-items: center;">
			<div class="col-12 px-0 py-0 d-flex flex-column">
				<div>
					<sup style="color: red;">*</sup><span class="formLabel">Email</span>
				</div>
				<div>
					<input
						id="email"
						v-model="factory.email"
						class="form-control"
						type="email"
						placeholder="johnsmith@gmail.com"
						:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('email')}"
					>
				</div>
			</div>
		</div>

		<div class="col-12 py-1 px-0 d-flex flex-row" style="align-items: center;">
			<div class="col-12 px-0 py-0 d-flex flex-column">
				<div>
					<sup style="color: red;">*</sup><span class="formLabel">Message</span>
				</div>
				<div>
					<textarea
						id="message"
						v-model="factory.message"
						class="form-control"
						rows="4"
						:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
						placeholder="I love Stranerd"
					/>
				</div>
			</div>
		</div>

		<div class="col-12">
			<button class="btn btn btn-lg btn-custom" style="width: 100%;" type="submit" :disabled="loading || !factory.valid">
				<PageLoading v-if="loading" />
				<span>Send Message</span>
			</button>
		</div>

		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateMessage } from '@app/hooks/forms/messages'
export default defineComponent({
	name: 'MessageForm',
	setup () {
		const { factory, loading, error, createMessage } = useCreateMessage()
		return { factory, loading, error, createMessage }
	}
})
</script>

<style lang="scss" scoped>
	input, textarea {
		border: 2px solid grey;
		border-radius: 6px;
		font-size: 14px;
		color: grey;
	}

	.formStyle {
		border: 2px solid grey;
		border-radius: 10px;
	}

	.formLabel {
		font-size: 15px;
		font-weight: $font-weight-medium;
		color: black;
	}

	.btn-custom {
		background-color: #354da3;
		color: #fff;
		border: 2px solid #354da3;
		border-radius: 6px;
		font-size: 15px;
		font-weight: $font-weight-medium;
	}
</style>
