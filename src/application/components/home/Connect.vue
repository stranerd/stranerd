<template>
	<div class="mt-1 text-white content_wrapper">
		<img src="@app/assets/images/homepage/connect_bg.svg" class="bgImage d-lg-block d-none">
		<img src="@app/assets/images/homepage/connect_sm.svg" class="bgImage d-block d-md-none">
		<img src="@app/assets/images/homepage/connect_md.svg" class="bgImage d-md-block d-none d-lg-none">
		<div class="zindex d-flex flex-row mt-lg-5 mt-md-3 mt-1 flex-wrap justify-content-center inner-wrapper align-items-center col-lg-8 offset-lg-2">
			<div class="col-lg-6 text-center d-flex flex-column py-0 justify-content-center  align-items-center">
				<div class="zindexhiger mt-2">
					<img src="@app/assets/images/homepage/stress_free.png" width="80%">
				</div>
			</div>
			<div class="col-lg-6 text-sm-center px-2 px-md-0 py-0 d-flex flex-column justify-content-start  justify-content-center justify-content-md-start ju align-items-center">
				<div class="paragraph px-md-5">
					Do away with academic stress because you can share all your problems here!
				</div>
				<div class="text-sm-center">
					<nuxt-link to="/auth/signup">
						<button
							class="btn btn-lg white-btn-custom mt-1 px-3 py-1"
						>
							Sign Up
						</button>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Connect'
})
</script>

<style scoped lang="scss">
	.bgImage {
		position:absolute;
		width:100%;
		height: auto;
	}
   .inner-wrapper {
	    position:relative;
		height: 410px;
		  @media (min-width: $md) {  height: 900px;}
	    @media (min-width: $lg) { height: 550px;}
   }

   .paragraph {
	   font-size: 16px;
	    @media (min-width: $md) {  font-size: 20px;}
	    @media (min-width: $lg) { font-size: 20px;}
   }
   .zindexhiger {
		z-index: 3;
	}
    .zindex {
		z-index: 2;
	}

	  .content_wrapper {
	   height: auto;
	   width: 100%;
	   position: relative;
	   margin-bottom: 140px;
   }

	.white-btn-custom {
		background-color: $color-white;
		color: $color-primary-dark;
		border: 2px solid $color-white;
		border-radius: 6px;
		font-weight: bold;
		width: auto;
		font-size: 15px;
	}
</style>
