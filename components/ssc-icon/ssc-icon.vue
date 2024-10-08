<template>
	<view class="icon">
		<image :src="url" mode="aspectFill"></image>
	</view>
</template>

<script setup>
	defineProps({
		url:{
			type:String,
			default:'/static/logo.png'
		}
	})
</script>

<style lang="scss" scoped>
	.icon{
		width: 50rpx;
		height: 50rpx;
		margin: 0 10rpx;
		border-radius: 50%; //圆形
		overflow: hidden; //给父级加上圆角时隐藏图像
		image{
			width: 100%;
			height: 100%;
			size: 28rpx;

		}
	}
</style>