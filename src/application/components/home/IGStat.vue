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
			<div
				class="w-100 flex-grow-1 text-center d-flex flex-column justify-content-center align-items-center position-relative"
			>
				<img class="ImageBubble" src="@app/assets/images/homepage/testimonial.svg">
				<div class="py-3 box">
					<div
						class="col-md-10 commentsBox p-1 d-flex flex-column justify-content-center align-items-center mx-auto"
					>
						<img :src="comments[currentIndex].img" class="testimonial-image">
						<div class="mb-1">
							{{ comments[currentIndex].text }}
						</div>
						<div class="mt-auto authorname">
							{{ comments[currentIndex].author }}
						</div>
					</div>
					<div class="d-flex justify-content-center align-items-center mt-1">
						<a class="commentIcons" to="#" @click.prevent="goToPrev">
							<i class="fas fa-chevron-left" />
						</a>
						<a
							v-for="(comment,index) in comments"
							:key="'comment'+ index"
							:class="currentIndex === index ? 'commentIconsDotActive' : 'commentIconsDot'"
							@click.prevent="goToComment(index)"
						>
							<i class="fas fa-circle" />
						</a>
						<a class="commentIcons" to="#" @click.prevent="goToNext">
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
				text: 'I’d say, for someone like me who has difficulty concentrating on stuff, you made navigation very easy. User interface, beautiful and easy to navigate. Cool and simple colors that do not confuse or hurt the eyes. And yay, I got my answer faster than I expected. I loved it.',
				author: 'Eunice Apo',
				img: require('@app/assets/images/testimonials/eunice.jpeg')
			},
			{
				text: 'I like how it\'s very well spelt-out what I have to do to advance in ranking.',
				author: 'Emmanuel Bello',
				img: require('@app/assets/images/testimonials/emmanuel.jpeg')
			},
			{
				text: 'It\'s very user friendly, and as someone mentioned earlier, the color palette of the website is easy on the eyes.',
				author: 'Laureen Abayomi',
				img: require('@app/assets/images/testimonials/laureen.jpeg')
			},
			{
				text: 'I\'ve been impressed mostly! I really like the "coin system”',
				author: 'Daniel Uwagwu',
				img: require('@app/assets/images/testimonials/daniel.jpeg')
			}
		]
		const currentIndex = ref(0)
		const goToComment = (index: number) => {
			if (index < 0) return currentIndex.value = comments.length - 1
			if (index >= comments.length) return currentIndex.value = 0
			return currentIndex.value = index
		}
		const goToNext = () => goToComment(currentIndex.value + 1)
		const goToPrev = () => goToComment(currentIndex.value - 1)

		return { comments, currentIndex, goToComment, goToPrev, goToNext }
	}
})
</script>

<style lang="scss" scoped>
	.testimonial-image {
		height: 60px;
		width: 60px;
		border-radius: 100%;
		object-fit: cover;
		margin-bottom: 9px;
	}

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
		transform: translateY(-40%);
	}

	.ImageBubble {
		width: 90%;
		@media (min-width: $md) {
			width: 50%;
		}
		@media (min-width: $lg) {
			width: 60%;
		}
	}

	.sub {
		font-size: 18px;
		@media (min-width: $md) {
			font-size: 25px;
		}
		@media (min-width: $lg) {
			font-size: 30px;
		}

		font-weight: bold;
	}

	.commentIcons {
		color: $color-white;
		font-size: 20px;
		@media (min-width: $md) {
			font-size: 21px;
		}
		@media (min-width: $lg) {
			font-size: 23px;
		}

		margin-right: 10px;
	}

	.commentIconsDot {
		color: $color-white;
		font-size: 10px;
		@media (min-width: $md) {
			font-size: 12px;
		}
		@media (min-width: $lg) {
			font-size: 12px;
		}

		margin-right: 10px;
	}

	.commentIconsDotActive {
		color: $color-primary;
		font-size: 10px;
		@media (min-width: $md) {
			font-size: 12px;
		}
		@media (min-width: $lg) {
			font-size: 12px;
		}

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
