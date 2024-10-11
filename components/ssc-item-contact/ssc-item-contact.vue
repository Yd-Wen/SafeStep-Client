<template>
	<view class="item">
		<image src="/static/image/contact.png" mode="aspectFit"></image>
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
		height: 200rpx;
		padding: 20rpx;
		margin-block: 10rpx;
		border: 2rpx solid $ssc-color-border-grey;
		border-radius: 20rpx;
		display: flex;
		image{
			width: 160rpx;
			height: 160rpx;
		}
		.detail{
			padding-left: 20rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			.name{
				height: 90rpx;
				line-height: 90rpx;
				color: $ssc-color-subtitle;
				font-size: $ssc-font-size-subtitle;
			}
			
			.phone{
				height: 70rpx;
				line-height: 70rpx;
				color: $ssc-color-paragraph;
				font-size: $ssc-font-size-paragraph;
			}
		}
	}
</style>