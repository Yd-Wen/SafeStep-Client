<template>
	<view class="banner">
		<swiper class="swiper" circular indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" 
		indicator-active-color="rgba(255, 255, 255, 1)" autoplay interval="3000" duration="1000">
			<swiper-item class="item" v-for="(item, index) in items" :key="index" @click="item.onClick">
				<image :src="item.imageUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
// 使用 defineProps 接收父组件传来的 props
defineProps([
	'items'
]);
</script>

<style lang="scss" scoped>
	.banner{
		width: 750rpx;
		padding: 10rpx 0;
		swiper{
			width: 740rpx;
			height: 350rpx;
			margin: 0 auto;
			&-item{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
				image{
					width: 100%;
					height: 350rpx;
				}
			}
		}
	}
</style>
