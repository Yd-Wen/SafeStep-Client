<template>
	<view class="raw">
		<view class="left">
			<ssc-icon :url="url"></ssc-icon>
			<view class="text">{{text}}</view>
		</view>
		<view class="right">
			<uni-icons type="right" size="20" color="#666666"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		url:{
			type:String,
			default:'/static/image/logo.png'
		},
		text:{
			type:String,
			default:'默认设置'
		}
		
	})
</script>

<style lang="scss" scoped>
	.raw{
		display: flex;
		justify-content: space-between; //两端对齐
		align-items: center;
		padding: 0 10rpx;
		height: 100rpx;
		.left{
			display: flex;
			align-items: center;
			.text{
				padding-left: 10rpx;
				color: $ssc-color-paragraph;
				font-size: $ssc-font-size-paragraph;
			}
		}
		.right{
			display: flex;
			align-items: center;
		}
	}
</style>