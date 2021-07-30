<template>
	<div class="mt-5 text-white content_wrapper">
		<img src="@app/assets/images/homepage/ig_session_sm.svg" class="bgImage d-md-none d-block">
		<img src="@app/assets/images/homepage/ig_session_md.svg" class="bgImage d-none d-md-block d-lg-none">
		<img src="@app/assets/images/homepage/ig_session.svg" class="bgImage d-none d-lg-block">
		<div class="text py-md-2 px-2 text-center">
			<span class="sub">Already trusted by more than 33,000 students</span>
		</div>
		<div
			class="d-flex flex-row  flex-wrap justify-content-center inner-wrapper align-items-center col-lg-10 offset-lg-1"
			style="margin-top: 100px;"
		>
			<div class="col-lg-6 text-center  my-md-0 d-flex flex-column justify-content-center  align-items-center">
				<img src="@app/assets/images/homepage/orange_bubble.svg" class="ImageBubble">
				<div>
					<img src="@app/assets/images/homepage/ig_new.png" width="80%">
				</div>
			</div>
			<div class="col-lg-6 col-12 px-2 py-2 smMargin px-lg-0 text-center d-flex flex-column justify-content-center align-items-center">
				<img src="@app/assets/images/homepage/pink_bubble_large.svg" class="ImageBubble">
				<img src="@app/assets/images/homepage/quote.svg" class="ImageQuote">
				<div class="d-flex flex-column justify-content-center align-items-center col-12 py-0 px-0">
					<div class="col-md-10 commentsBox d-flex flex-column align-items-center justify-content-center">
						<div class="py-1 mt-2 px-md-2 px-1 d-md-block d-none">
							{{ comments[currentIndex].text }}
						</div>
						<div class="py-1 mt-2 px-md-2 px-1 d-block d-md-none">
							{{ comments[currentIndex].text.substring(0,60) }}...
						</div>
						<div class="mt-auto py-1 authorname">
							{{ comments[currentIndex].author }}
						</div>
					</div>
				</div>
				<div class="col-12 d-flex flex-row justify-content-center controller align-items-center">
					<a to="#" class="commentIcons" @click.prevent="goToPrev">
						<i class="fas fa-chevron-left" />
					</a>
					<a
						v-for="(comment,index) in comments"
						:key="'comment'+ index"
						to="#"
						:class="currentIndex == index ? 'commentIconsDotActive' : 'commentIconsDot'"
						@click.prevent="goToComment(index)"
					>
						<i class="fas fa-circle" />
					</a>
					<a to="#" class="commentIcons" @click.prevent="goToNext">
						<i class="fas fa-chevron-right" />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'IGStat',
	 data () {
		return {
			comments: [
				{
					text: 'Stranerd has been a very helpful platform for me. They have standby assistance for any problems I had and that was through DM on Instagram. The website would be even better!!!',
					author: 'Taiwo Toluwalase'
				},
				{
					text: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
					author: 'Joseph King'
				},
				{
					text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs!!!',
					author: 'Akin James'
				},
				{
					text: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.!!!',
					author: 'Idris Mike'
				}
			],
			currentIndex: 0

		}
	},
	methods: {
		goToComment (commentIndex: number) {
			 if ((commentIndex >= this.comments.length) || (commentIndex < 0)) {
				 this.currentIndex = 0
				 return
			 }
			this.currentIndex = commentIndex
		},
		goToNext () {
			const currentIndex = this.currentIndex
		   this.goToComment(currentIndex + 1)
		},
		goToPrev () {
			const currentIndex = this.currentIndex
		   this.goToComment(currentIndex - 1)
		}
	}
})
</script>

<style scoped lang="scss">

	.content_wrapper {
		position: relative;
		margin-bottom: 100px;
	}

	.authorname {
		color: $color-primary;
		font-size: 15px;
		font-weight: bold;
	}

	.commentsBox {
		background: $color-white;
		border: 1px solid $color-white;
		border-radius: 16px;
		color: $color-sub;
		height: 150px;
		@media (min-width: $md) { min-height: 190px; height: 170px; }
		@media (min-width: $lg) { min-height: 190px; height: 170px; }
	}

	.bgImage {
		position: absolute;
		width: 100%;
		height: auto;
		z-index: -2;
	}

	.inner-wrapper {
		position: relative;
		height: 510px;
		@media (min-width: $md) { height: 1250px; }
		@media (min-width: $lg) { height: 515px; }
	}

	.ImageBubble {
		z-index: -1;
		width: 69%;
		height: 69%;
		@media (min-width: $md) {
			width: 60%;
			height: 60%;
		}
		@media (min-width: $lg) {
			width: 70%;
			height: 70%;
		}

		position: absolute;
	}

	.controller {
		position: absolute;
		bottom: 5%;
		@media (min-width: $md) { bottom: 13%; }
		@media (min-width: $lg) { bottom: 17%; }
	}

	.ImageQuote {
		top: 43%;
		@media (min-width: $md) { top: 50%; }
		@media (min-width: $lg) { top: 12%; }

		width: 13%;
		height: 13%;
		position: absolute;
	}

	.sub {
		font-size: 18px;
		@media (min-width: $md) { font-size: 25px; }
		@media (min-width: $lg) { font-size: 30px; }

		font-weight: bold;
	}

	.commentIcons {
		color: $color-white;
		font-size: 20px;
		@media (min-width: $md) { font-size: 21px; }
		@media (min-width: $lg) { font-size: 23px; }

		margin-right: 10px;
	}

	.smMargin {
		margin-top: 70px !important;
		@media (min-width: $md) { margin-top: 0; }
		@media (min-width: $lg) { margin-top: 0; }
	}

	.commentIconsDot {
		color: $color-white;
		font-size: 10px;
		@media (min-width: $md) { font-size: 12px; }
		@media (min-width: $lg) { font-size: 12px; }

		margin-right: 10px;
	}

	.commentIconsDotActive {
		color: $color-primary;
		font-size: 10px;
		@media (min-width: $md) { font-size: 12px; }
		@media (min-width: $lg) { font-size: 12px; }

		margin-right: 10px;
	}

	.text {
		top: 55px;
		@media (min-width: $md) { top: 95px; }
		@media (min-width: $lg) { top: 115px; }

		position: relative;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		border: 2px solid $color-primary-dark;
		border-radius: 6px;
		font-weight: bold;
	}
</style>
