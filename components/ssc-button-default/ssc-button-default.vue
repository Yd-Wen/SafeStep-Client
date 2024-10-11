<template>
	<view class="button">
		<button type="default">{{text}}</button>
	</view>
</template>

<script setup>
	defineProps({
		text:{
			type:String,
			default:'按钮'
		}
	})
</script>

<style lang="scss" scoped>
	.button{
		button{
			background-color: #fff;
			border: 5rpx solid $ssc-color-primary;
			border-radius: 50rpx;
			font-size: $ssc-font-size-subtitle;
		}
	}
</style>