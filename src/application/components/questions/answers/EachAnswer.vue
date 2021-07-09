<template>
	<div class="wrapperClass pt-1 d-flex flex-column">
		<div class="px-2 py-0 d-flex flex-row" style="align-items:center;">
			<div class=" d-flex align-items-center">
				<Avatar src="@app/assets/images/icons/dashboard_hero.svg" :size="32" />
				<span class="name ms-1">Jerry Maguire</span>
			</div>
			<div style="margin-left:auto;" class="colorStar">
				<span style="margin-right:2px;"><i class="fas fa-star" /></span>
				<span style="margin-right:2px;"><i class="fas fa-star" /></span>
				<span style="margin-right:2px;"><i class="fas fa-star" /></span>
				<span style="margin-right:2px;"><i class="fas fa-star" /></span>
				<span style="margin-right:2px;"><i class="fas fa-star" /></span>
			</div>
		</div>
		<div class="px-2 py-2 d-flex flex-column borderBottom">
			<div style=" py-1">
				<h5 class="headerText">
					This is your main answer
				</h5>
			</div>
			<div class="d-flex flex-row pb-1 moreAnswer" style="align-items:center;">
				<div>
					<span style="font-weight:bold;" class="me-1">
						Explanation
					</span>
					<span>
						<i class="fas fa-caret-down" />
					</span>
				</div>
				<div class="d-flex flex-row" style="margin-left:auto;">
					<div class="me-2" style="font-weight:bold;">
						<span class="me-1">Mark as best</span><i class="fas fa-check-circle" />
					</div>
					<div class="me-2" style="font-weight:bold;">
						<i class="fas fa-reply" />
					</div>
					<div style="font-weight:bold;">
						<i class="fas fa-flag" />
					</div>
				</div>
			</div>
		</div>
		<div class="px-2 py-1 d-flex flex-column borderBottom">
			<div class="d-flex flex-row" style="align-items:center;">
				<div class=" d-flex align-items-center">
					<Avatar src="@app/assets/images/icons/dashboard_hero.svg" :size="27" />
					<span class="name mx-1" style="font-size:15px;">Jerry Maguire</span>
					<span class="subComment">This is one of the so called comment, lol</span>
				</div>
			</div>
		</div>
		<div class="d-flex flex-row px-1" style="align-items:center;">
			<div class="me-1">
				<Avatar src="@app/assets/images/icons/dashboard_hero.svg" :size="33" />
			</div>
			<div style="width:100%;">
				<input class="form-control py-1 px-1" style="border:none;" placeholder="Add comment to this answer">
			</div>
			<div style="margin-left:auto;" class="ms-1">
				<button class="btn custom-btn">
					send
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'EachAnswer'
})
</script>
<style lang="scss" scoped>
.name {
	font-weight: bold;
	font-size: 19px;
}
.wrapperClass {
	border:1px solid $color-line;
	border-radius: 7px;
}
.colorStar {
	color: $color-line;
	font-size: 18px;
}
.headerText {
	font-weight: bolder;
	color:$color-text-main;
}
.moreAnswer {
	color:$color-main;
}
.borderBottom {
	border-bottom: 1px solid $color-line;
}
.subComment {
	font-size: 14px;
    color: $color-text-sub;
}

.custom-btn {
	border:1px solid  $color-line;
	color:$color-main;
	border-radius:5px;
}
</style>
