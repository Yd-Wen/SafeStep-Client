<template>
	<view class="profile">
		<view class="avatar">
			<image src="/static/image/avatar_default.png" mode="aspectFill"></image>
		</view>
		<view class="avatarHint">点击修改头像</view>
		<view class="detail">
			<view class="uid">
				<view class="title">UID</view>
				<view class="content">100000</view>
			</view>	
			<view class="phone">
				<view class="title">手机号</view>
				<view class="content">18379856211</view>
			</view>	
			<view class="nickname">
				<view class="title">昵称</view>
				<input class="contentInput" value="王五"/>
			</view>	
			<view class="description">
				<view class="title">简介</view>
				<textarea class="content" placeholder="平安步，步步平安！"/>
			</view>	
		</view>
		<view class="btn">
			<ssc-button-primary text="提交"/>
		</view>
		<view class="btn">
			<ssc-button-default text="取消"/>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.profile{
		display: flex; 
		align-items: center; //水平居中
		justify-content: center; //垂直居中
		flex-direction: column; //换行显示
		padding: 50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border: 1rpx solid $ssc-color-border-grey ;
			border-radius: $ssc-border-radius-circle; //圆形
			overflow: hidden; //给父级加上圆角时隐藏图像
			image{
				width: 100%;
				height: 100%;
			}
		}
		.avatarHint{
			font-size: $ssc-font-size-hint;
			color: $ssc-color-hint;
		}
		.detail{
			margin-top: 50rpx;
			width: 680rpx;
			padding-bottom: 10rpx;
			border-radius: 10rpx;
			border: 2rpx solid $ssc-color-border-grey;
			.uid, .phone, .nickname{
				width: 660rpx;
				height: 100rpx;
				display: flex;
				align-items: center; //垂直居中
				.title{
					width: 150rpx;
					padding-inline: 10rpx;
					color: $ssc-color-primary;
					font-size: $ssc-font-size-subtitle;
				}
				.content{
					width: 500rpx;
					height: 80rpx;
					padding-left: 10rpx;
					display: flex;
					align-items: center;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;				
					background-color: $ssc-color-border-grey;
				}
				.contentInput{
					width: 500rpx;
					height: 80rpx;
					border: none;
					border-bottom: 1rpx solid $ssc-color-primary;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;
				}
			}
			.description{
				width: 660rpx;
				.title{
					padding: 10rpx;
					color: $ssc-color-primary;
					font-size: $ssc-font-size-subtitle;
				}
				.content{
					width: 640rpx;
					height: 150rpx;
					margin-inline:10rpx 10rpx;
					padding: 10rpx;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;
					background-color: $ssc-color-text-bg;
				}
			}
		}
		.btn{
			width: 600rpx;
			margin-top: 20rpx;
		}
	}
</style>
