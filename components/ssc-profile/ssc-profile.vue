<template>
	<view class="profile">
		<view class="avatar">
			<image :src="avatar" mode="aspectFill"></image>
		</view>
		<view class="nickname">{{nickname}}</view>
		<view class="uid">{{uid}}</view>		
	</view>
</template>

<script setup>
	defineProps({
		avatar:{
			type:String,
			default:'/static/image/avatar_default.png'
		},
		nickname:{
			type:String,
			default:'未登录用户',
		},
		uid:{
			type:String,
			default:'000000'
		}
	})
</script>

<style lang="scss" scoped>
	.profile{
		display: flex; 
		align-items: center; //水平居住
		justify-content: center; //垂直居中
		flex-direction: column; //换行显示
		padding: 50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border: 1px solid $ssc-color-border-grey ;
			border-radius: $ssc-border-radius-circle; //圆形
			overflow: hidden; //给父级加上圆角时隐藏图像
			image{
				width: 100%;
				height: 100%;
			}
		}
		.nickname{
			font-size: $ssc-font-size-subtitle;
			color: $ssc-color-subtitle;
			padding: 20rpx 0;
		}
		.uid{
			font-size: $ssc-font-size-hint;
			color: $ssc-color-hint;
		}
	}
</style>