<template>
	<div class="gap-2 col-12 content_wrapper">
		<div class="d-flex flex-column col-lg-10 offset-lg-1 inner-wrapper">
			<h2 class="text-center">
				Get in touch with us
			</h2>
			<div class="d-flex flex-row align-items-center justify-content-center position-relative mt-3">
				<div class="col-md-8  d-flex flex-column justify-content-center  align-items-center">
					<img src="@app/assets/images/homepage/yellow_bubble.svg" class="ImageBubble">
					<form class="formStyle zindexhiger cardform d-flex flex-column py-2 px-2" @submit.prevent="createMessage">
						<div class="col-12 py-0 px-0 d-flex flex-row flex-wrap">
							<div class="col-lg-5 col-12 d-flex flex-column mb-1 mb-lg-0">
								<div>
									<sup style="color: red;">*</sup><span class="formLabel">First Name</span>
								</div>
								<div>
									<input
										id="first_name"
										v-model="factory.fName"
										class="form-control"
										placeholder="John"
										:class="{'is-invalid': factory.errors.fName, 'is-valid': factory.isValid('fName')}"
									>
									<small v-if="factory.errors.fName" class="small text-danger d-block">{{ factory.errors.fName }}</small>
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
											v-model="factory.lName"
											class="form-control"
											placeholder="Smith"
											:class="{'is-invalid': factory.errors.lName, 'is-valid': factory.isValid('lName')}"
										>
										<small v-if="factory.errors.lName" class="small text-danger d-block">{{ factory.errors.lName }}</small>
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
									<small v-if="factory.errors.email" class="small text-danger d-block">{{ factory.errors.email }}</small>
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
									<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
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
					<div class="mt-2 card cardform contactText py-1 px-1 d-flex flex-row flex-wrap align-items-center justify-content-center">
						<div class="col-md-6 py-0 px-0 mb-1 mb-md-0 d-flex flex-row col-12 align-items-center ">
							<div>
								<img src="@app/assets/images/homepage/call.svg" height="30">
							</div>
							<div>
								<a href="tel:+1 800 STRANERD"><span class="px-1">+1 800 STRANERD</span></a>
							</div>
						</div>
						<div class="col-md-6 py-0 px-0 col-12 mb-md-0 d-flex flex-row align-items-center ">
							<div>
								<img src="@app/assets/images/homepage/message.svg" height="30">
							</div>
							<div>
								<a href="mailto:support@stranerd.com"><span class="px-1">support@stranerd.com</span></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
	 h2 {
		margin-bottom: 0;
		font-size: 21px;
		color:$color-text-header;
		@media (min-width: $md) { font-size: 34px; }
		@media (min-width: $lg) { font-size: 37px; }
		@media (min-width: $xl) { font-size: 40px; }
	}

	input, textarea {
		border: 1px solid $color-sub;
		border-radius: 3px;
		font-size: 14px;
		color: $color-sub;
	}

	.formStyle {
		border-radius: 10px;
	}

	.formLabel {
		font-size: 15px;
		font-weight: bold;
	}

	 .content_wrapper {
	    height: auto;
	   position: relative;
	   margin-bottom: 60px;
	    margin-top: 120px;
   }

   .ImageBubble {
        width: 95%;
		height: 95%;
		top:30%;
		@media (min-width: $md) {  width: 55%;
		top:50%;
		height: 55%; }
		@media (min-width: $lg) {  width: 50%;
		top:50%;
		height: 50%; }
		position: absolute;
	}

	.zindexhiger {
		z-index: 3;
	}

	 .inner-wrapper {
	    position:relative;
		height: auto;
   }

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		border: 2px solid $color-primary;
		border-radius: 6px;
		font-size: 15px;
		font-weight: bold;
	}

.cardform {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background: $color-white;
}

.cardform:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.contactText {
	font-weight: bold;
}
</style>
