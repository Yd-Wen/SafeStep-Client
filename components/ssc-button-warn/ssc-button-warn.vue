<template>
	<view class="button">
		<button @click="$emit('click')" type="warn">{{text}}</button>
	</view>
</template>

<script setup>
defineProps({
	text:{
		type:String,
		warn:'按钮'
	}
})
defineEmits(['click'])
</script>

<style lang="scss" scoped>
	.button{
		button{
			background-color: #fff;
			border: 5rpx solid $ssc-color-warn;
			border-radius: 50rpx;
			font-size: $ssc-font-size-subtitle;
			color: $ssc-color-warn;
		}
	}
</style>