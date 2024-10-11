<template>
	<view class="item">
		<navigator url="">
			<view class="name">设备名称</view>
			<view class="status">
				<view class="dot"/>
				<view class="text">可用</view>
			</view>
			<image src="/static/image/device.png" mode="aspectFill"></image>		
		</navigator>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.item{
		width: 350rpx;
		height: 300rpx;
		padding: 20rpx;
		border: 2rpx solid $ssc-color-border-grey;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.name{
			height: 80rpx;
			line-height: 80rpx;
			color: $ssc-color-subtitle;
			font-size: $ssc-font-size-subtitle;
		}
		.status{
			height: 70rpx;
			display: flex;
			align-items: center;
			.dot{
				width: 10px;
				height: 10px;
				border-radius: 50%;
				margin-right: 10px;
				background-color: $ssc-color-primary;
			}
			.text{
				height: 70rpx;
				line-height: 70rpx;
				color: $ssc-color-paragraph;
				font-size: $ssc-font-size-paragraph;
			}
		}
		image{
			width: 150rpx;
			height: 150rpx;
		}
	}
</style>