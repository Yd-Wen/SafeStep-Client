<template>
	<view class="logo">
		<image src="/static/image/app/logo.png" mode="aspectFill"></image>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.logo{
		width: 160rpx;
		height: 160rpx;
		background-color: $ssc-color-primary-light;
		border-radius: $ssc-border-radius-card; //卡片形
		overflow: hidden; //给父级加上圆角时隐藏图像
		image{
			width: 90%;
			height: 90%;
			padding: 10rpx;
		}
	}
</style>