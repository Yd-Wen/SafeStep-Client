<template>
	<view class="layout">
		<view class="bg">
			<view class="text">登录</view>
			<image src="/static/image/welcome.png" mode="aspectFill"></image>
		</view>
		<view class="form">
			<view class="content">
				<image src="/static/image/account.png" mode="aspectFill"/>
				<input :value="account" @input="onIptAccount" type="number" maxlength="11" placeholder="请输入手机号"/>
			</view>
			<view class="content">
				<image src="/static/image/passwd.png" mode="aspectFill"/>
				<input :value="pwd" @input="onIptPwd" password type="safe-password" maxlength="12" placeholder="请输入密码"/>
			</view>
			<view @click="onForgetPwd" class="forgetPwd">忘记密码</view>
		</view>
		<view class="btn">
			<ssc-button-primary @click="onLogin" text="登录"/>
		</view>
		<view class="btn">
			<ssc-button-default @click="onRegister" text="注册"/>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {loginUserAPI} from './api.js'
import { validAccount, validPwd } from '../../utils/stringUtil';

const account = ref("")
const pwd = ref("")

function onIptAccount(e) {
	account.value = e.detail.value
}

function onIptPwd(e) {
	pwd.value = e.detail.value
}

function onForgetPwd() {
	uni.navigateTo({
		url: '/pages/pwd-reset/pwd-reset'
	})
}

async function onLogin() {
	// 校验账号和密码
	if(!validAccount(account.value)||!validPwd(pwd.value)) return;
	// 调用登录接口
	let loginRes = await loginUserAPI({
		account: account.value,
		password: pwd.value
	})
	// 登录成功
	if(loginRes.code == 1){
		// 保存用户信息到本地
		uni.setStorageSync('userInfo', {
			account: account.value,
			password: pwd.value
		})
		uni.setStorageSync('userToken', loginRes.data)
		// 延迟 1 秒后跳转首页
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/home/home'
			});
		}, 1000);
	}
}

function onRegister() {
	uni.redirectTo({
		url:'/pages/register/register'
	})
}

function loadData() {
	const userInfo = uni.getStorageSync('userInfo');
	if (userInfo) {
		account.value = userInfo.account;
		pwd.value = userInfo.password; // 请确保这样做是安全的
	}
}

onMounted(()=>{
	loadData()
})
	
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
			height: 550rpx;
			background-image: linear-gradient(to top right, #fcfef7 0%, #f7fdee 50%, #f0fde5 100% );
			display: flex;
			justify-content: space-between;
			padding: 0 50rpx;
			.text{
				font-size: $ssc-font-size-title;
				color: $ssc-color-title;
				font-weight: bold;
				position: relative;
				top: 300rpx;
			}
			image{
				width: 480rpx;
				height: 360rpx;
				position: relative;
				top: 150rpx;
			}
		}
		.form{
			position: relative;
			bottom: 50rpx;
			width: 680rpx;
			height: 450rpx;
			background-color: #fff;
			border-radius: 30rpx; //卡片形
			box-shadow: 0 0 10rpx 0 $ssc-color-border-grey;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.content{
				width: 620rpx;
				height: 100rpx;
				margin: 25rpx;
				padding: 0 10rpx;
				display: flex;
				align-items: center;
				input{
					width: 520rpx;
					height: 100rpx;
					padding: 0 20rpx;
					border-bottom: 1rpx solid $ssc-color-primary;
				}
				image{
					width: 50rpx;
					height: 50rpx;
					padding-right: 20rpx;
				}
			}
			.forgetPwd{
				width: 620rpx;
				padding: 0 20rpx;
				text-align: start;
				font-size: $ssc-font-size-hint;
				color: $ssc-color-primary;
			}
		}
		.btn{
			width: 600rpx;
			margin-bottom: 50rpx;
		}

	}
	
</style>
