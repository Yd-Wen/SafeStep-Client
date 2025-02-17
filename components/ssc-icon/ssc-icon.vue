<template>
	<view class="icon">
		<image :src="url" mode="aspectFill"></image>
	</view>
</template>

<script setup>
	defineProps({
		url:{
			type:String,
			default:'/static/image/app/logo.png'
		}
	})
</script>

<style lang="scss" scoped>
	.icon{
		width: 50rpx;
		height: 50rpx;
		margin: 0 10rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>