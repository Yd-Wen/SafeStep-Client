<template>
	<view>
		<navigator url="/pages/index/index">
			<image class="image" src="/static/test/1.jpg" mode="aspectFill"></image>
		</navigator>
		
		<scroll-view scroll-x scroll-y class="scroll">
			<view class="group">
				<view class="item">111</view>
				<view class="item">222</view>
				<view class="item">333</view>
				<view class="item">444</view>
				<view class="item">555</view>
				<view class="item">666</view>
				<view class="item">777</view>
			</view>
		</scroll-view>
		<swiper class="swiper" circular indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" 
		indicator-active-color="rgba(255, 255, 255, 1)" autoplay interval="3000" duration="1000">
			<swiper-item class="item">
				<image src="/static/test/1.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item class="item">
				<image src="/static/test/2.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item class="item">
				<image src="/static/test/3.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
	}
</script>

<style lang="scss">
	.image{
		width: 500rpx;

	}
	.scroll{
		border: 1px solid red;
		box-sizing: border-box;
		height: 165rpx;
		.group{
			white-space: nowrap;
			.item{
				width: 220rpx;
				height: 110rpx;
				background-color: green;
				display: inline-block;
				margin-right: 10rpx;
			}
		}
	}
	.swiper{
		height: 400rpx;
		margin-top: 100rpx;
		.item{
			padding: 0 10rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			image{
				width: 100%;
				height: 400rpx;
			}
		}
	}

</style>
