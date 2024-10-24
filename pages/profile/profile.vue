<template>
	<view class="profile">
		<view class="avatar">
			<image :src="user.avatar" mode="aspectFill"></image>
		</view>
		<view class="avatarHint">点击修改头像</view>
		<view class="detail">
			<view class="uid">
				<view class="title">UID</view>
				<view class="content">{{user.userCode}}</view>
			</view>	
			<view class="phone">
				<view class="title">手机号</view>
				<view class="content">{{user.account}}</view>
			</view>	
			<view class="nickname">
				<view class="title">昵称</view>
				<input :value="user.userName" @input="onIptNickname" class="contentInput" maxlength="20"/>
			</view>	
			<view class="description">
				<view class="title">简介</view>
				<textarea :value="user.userDescription" @input="onIptDescription" class="content" placeholder="平安步，步步平安！"/>
			</view>	
		</view>
		<view class="btn">
			<ssc-button-primary @click="onSubmit" text="提交"/>
		</view>
		<view class="btn">
			<ssc-button-default @click="onCancel" text="取消"/>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getUserInfoAPI, updateUserInfoAPI } from './api.js';	

//用户信息(第一次只有账号和密码)
let user = ref({})

//输入昵称
function onIptNickname(e){
	user.value.userName = e.detail.value;
}

//输入描述
function onIptDescription(e){
	user.value.userDescription = e.detail.value;
}

//提交
async function onSubmit(){
	let result = await updateUserInfoAPI(user.value)
	if (result.code == 1) {
		// 更新本地缓存
		uni.setStorageSync('userInfo', {
			avatar: user.value.avatar,
			userCode: user.value.userCode,
			account: user.value.account,
			password: user.value.password,
			userName: user.value.userName,
			userDescription: user.value.userDescription,
		})
		// 延迟 1 秒后返回上一页
		setTimeout(() => {
			uni.navigateBack()
		}, 1000)
	}
}

//取消
function onCancel(){
	uni.navigateBack()
}

//获取用户信息
async function getUserInfo(){
	try {
		// 从本地缓存中获取用户信息
		user.value = uni.getStorageSync('userInfo');
		
		if (!user.value.userCode) {
			// 从服务器获取用户信息
			let result = await getUserInfoAPI({
				account: user.value.account
			});
			if (result.code == 1) {
				user.value = result.data;
				// 保存到本地缓存
				uni.setStorageSync('userInfo', {
					avatar: user.value.avatar,
					userCode: user.value.userCode,
					account: user.value.account,
					password: user.value.password,
					userName: user.value.userName,
					userDescription: user.value.userDescription
				});
			}
		}
	} catch (error) {
		console.error('获取用户信息失败:', error);
	}
}
	
onMounted(()=>{
	getUserInfo()
})

	
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
