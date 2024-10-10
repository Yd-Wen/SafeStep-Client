<template>
	<view class="button">
		<button type="default" :style="style">{{text}}</button>
	</view>
</template>

<script setup>
	defineProps({
		text:{
			type:String,
			default:'按钮'
		},
		style:{
			type:Object,
			default:{width:'600rpx'}
		}
	})
</script>

<style lang="scss" scoped>
	.button{
		button{
			width: 600rpx;
			background-color: #fff;
			border: 5rpx solid $ssc-color-primary;
			border-radius: 50rpx;
			font-size: $ssc-font-size-subtitle;
		}
	}
</style>