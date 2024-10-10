<template>
	<view class="layout">
		<view class="bg">
			<view class="text">注册</view>
			<image src="/static/image/welcome.png" mode="aspectFill"></image>
		</view>
		<view class="forms">
			<input type="text" placeholder="请输入手机号"/>
			<input type="text" placeholder="请输入验证码"/>
		</view>
		<button class="register">注册</button>
		<button class="login">登录</button>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.layout{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.bg{
			width: 750rpx;
			height: 450rpx;
			background-image: linear-gradient(to top right, #fcfef7 0%, #f7fdee 50%, #f0fde5 100% );
			display: flex;
			justify-content: space-between;
			padding: 0 50rpx;
			.text{
				font-size: $ssc-font-size-title;
				color: $ssc-color-title;
				font-weight: bold;
				position: relative;
				top: 250rpx;
			}
			image{
				width: 400rpx;
				height: 300rpx;
				position: relative;
				top: 100rpx;
			}
		}
		.forms{
			position: relative;
			bottom: 100rpx;
			width: 680rpx;
			height: 450rpx;
			background-color: #fff;
			border-radius: 30rpx; //卡片形
			box-shadow: 0 10rpx 10rpx 0 $ssc-color-border-grey;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.register{
			margin: 50rpx;
			width: 600rpx;
			background-color: $ssc-color-primary;
			border-radius: 50rpx;
			font-size: $ssc-font-size-subtitle;
		}
		.login{
			width: 600rpx;
			background-color: #fff;
			box-sizing: border-box;
			border: 2rpx solid $ssc-color-primary;
			border-radius: 50rpx;
			color: #000;
			font-size: $ssc-font-size-subtitle;
		}
	}
	
</style>
