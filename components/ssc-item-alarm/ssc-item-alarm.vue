<template>
	<navigator :url="`/pages/detail-alarm/detail-alarm?alarm=${JSON.stringify(alarm)}`">
		<view class="item">
			<view class="logo">
				<image src="/static/image/activity/activity_fall.png" mode="aspectFit"></image>
			</view>
			<view class="detail">
				<view class="location">{{alarm.fallLocation}}</view>
				<view class="time">{{alarm.fallTime}}</view>
			</view>	
			<view class="feedback" :style="{color:alarm.feedbackColor}">{{alarm.fallFeedback}}</view>
		</view>
	</navigator>
</template>

<script setup>
import { ref } from 'vue';
// 定义接收父组件传入的 alarm 数据
defineProps({
    alarm: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped>
	navigator{
		background-color: transparent; /* 透明背景 */
		.item{
			width: 680rpx;
			height: 150rpx;
			padding-inline: 20rpx;
			margin-block: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.logo{
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
				margin-left: 30rpx;
				padding-inline: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				.location{
					height: 60rpx;
					margin-block-start: 25rpx;
					color: $ssc-color-subtitle;
					font-size: $ssc-font-size-subtitle;
				}
				
				.time{
					height: 40rpx;
					margin-block-end: 25rpx;
					color: $ssc-color-hint;
					font-size: $ssc-font-size-hint;
				}
			}
			.feedback{
				height: $ssc-font-size-hint;
				margin-left: auto; /* 自动填充左边距使对齐到右边 */
				text-align: right; /* 文字右对齐 */
				line-height: $ssc-font-size-paragraph;
				font-size: $ssc-font-size-paragraph;
			}
		}
	}
</style>