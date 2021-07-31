<template>
	<div class="content_wrapper py-5 px-2">
		<div class="sub mb-2 text-center">
			Already trusted by more than 33,000 students
		</div>
		<div
			class="d-flex flex-column flex-lg-row justify-content-center inner-wrapper align-items-center col-lg-10 offset-lg-1 gap-2"
		>
			<div class="w-100 flex-grow-1 text-center">
				<img src="@app/assets/images/homepage/stranerd-ig.svg" width="100%">
			</div>
			<div class="w-100 flex-grow-1 text-center d-flex flex-column justify-content-center align-items-center position-relative">
				<img src="@app/assets/images/homepage/testimonial.svg" class="ImageBubble">
				<div class="py-3 box">
					<div class="d-flex flex-column justify-content-center align-items-center">
						<div class="col-md-10 commentsBox py-1 -2 px-2 d-flex flex-column align-items-center justify-content-center">
							<div class="mb-1">
								{{ comments[currentIndex].text }}
							</div>
							<div class="mt-auto authorname">
								{{ comments[currentIndex].author }}
							</div>
						</div>
					</div>
					<div class="d-flex justify-content-center align-items-center mt-1 mt-md-2">
						<a to="#" class="commentIcons" @click.prevent="goToPrev">
							<i class="fas fa-chevron-left" />
						</a>
						<a
							v-for="(comment,index) in comments"
							:key="'comment'+ index"
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
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'IGStat',
	setup () {
		const comments = [
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
		]
		const currentIndex = ref(0)
		const goToComment = (index: number) => {
			if (index >= comments.length || index < 0) {
				return currentIndex.value = 0
			 }
			currentIndex.value = index
		}
		const goToNext = () => goToComment(currentIndex.value + 1)
		const goToPrev = () => goToComment(currentIndex.value - 1)

		return { comments, currentIndex, goToComment, goToPrev, goToNext }
	}
})
</script>

<style scoped lang="scss">
	.content_wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: $color-primary;
		color: $color-white;
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
		min-height: 150px;
	}

	.box {
		position: absolute;
		z-index: 1;
		top: 50%;
		transform: translateY(-50%);
	}

	.ImageBubble {
		width: 70%;
		@media (min-width: $md) {
			width: 60%;
		}
		@media (min-width: $lg) {
			width: 70%;
		}
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

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		border: 2px solid $color-primary-dark;
		border-radius: 6px;
		font-weight: bold;
	}
</style>
