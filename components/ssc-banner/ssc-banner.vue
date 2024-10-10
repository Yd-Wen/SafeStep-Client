<template>
	<view class="banner">
		<swiper class="swiper" circular indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" 
		indicator-active-color="rgba(255, 255, 255, 1)" autoplay interval="3000" duration="1000">
			<swiper-item class="item">
				<image src="/static/image/banner/banner_device.png" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item class="item">
				<image src="/static/image/banner/banner_contact.png" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item class="item">
				<image src="/static/image/banner/banner_activity.png" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
	.banner{
		width: 750rpx;
		padding: 30prx 0;
		swiper{
			width: 750rpx;
			height: 350rpx;
			&-item{
				width: 100%;
				height: 100%;
				padding: 0 10rpx;
				border-radius: 20rpx;
				image{
					width: 100%;
					height: 350rpx;
					background-color: #000000;
				}
			}
		}
	}
</style>
