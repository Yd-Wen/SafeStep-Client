<template>
	<view class="item">
		<view class="avatar">
			<image src="/static/image/contact.png" mode="aspectFit"></image>
		</view>
		<view class="detail">
			<view class="name">联系人姓名</view>
			<view class="phone">联系人电话</view>
		</view>	
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.item{
		width: 680rpx;
		height: 150rpx;
		padding-inline: 20rpx;
		margin-block: 10rpx;
		display: flex;
		.avatar{
			width: 100rpx;
			height: 100rpx;
			margin-block: 25rpx;
			border: 1rpx solid $ssc-color-border-grey ;
			border-radius: $ssc-border-radius-circle; //圆形
			overflow: hidden; //给父级加上圆角时隐藏图像
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail{
			padding-inline: 20rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			.name{
				height: 60rpx;
				line-height: 60rpx;
				margin-block-start: 25rpx;
				color: $ssc-color-subtitle;
				font-size: $ssc-font-size-subtitle;
			}
			
			.phone{
				height: 40rpx;
				line-height: 40rpx;
				margin-block-end: 25rpx;
				color: $ssc-color-paragraph;
				font-size: $ssc-font-size-paragraph;
			}
		}
	}
</style>