<template>
	<navigator :url="`/pages/detail-device/detail-device?device=${JSON.stringify(device)}`">
		<view class="item">
			<view class="name">{{device.deviceName}}</view>
			<view class="status">
				<view :class="device.deviceStatus==1?'greendot':'reddot'"/>
				<view class="text">{{device.deviceStatus==1?'可用':'停用'}}</view>
			</view>
			<image src="/static/image/app/device.png" mode="aspectFill"></image>		
		</view>
	</navigator>
	
</template>

<script setup>
// 定义接收父组件传入的 device 数据
defineProps({
    device: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped>
	navigator{
		background-color: transparent; /* 透明背景 */
		.item{
			width: 345rpx;
			height: 200rpx;
			padding-inline: 20rpx;
			border: 2rpx solid $ssc-color-card;
			background-color: $ssc-color-card;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			.name{
				width: 300rpx;
				height: 60rpx;
				line-height: 60rpx;
				color: $ssc-color-subtitle;
				font-size: $ssc-font-size-subtitle;
				overflow: hidden; // 溢出隐藏
				text-overflow: ellipsis; // 文本溢出时显示省略号
				white-space: nowrap; // 设置块级元素内多行文本为单行
			}
			.status{
				height: 40rpx;
				display: flex;
				align-items: center;
				.greendot{
					width: 10px;
					height: 10px;
					border-radius: 50%;
					margin-right: 10px;
					background-color: $ssc-color-primary;
				}
				.reddot{
					width: 10px;
					height: 10px;
					border-radius: 50%;
					margin-right: 10px;
					background-color: red;
				}
				.text{
					height: 40rpx;
					line-height: 40rpx;
					color: $ssc-color-hint;
					font-size: $ssc-font-size-hint;
				}
			}
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>