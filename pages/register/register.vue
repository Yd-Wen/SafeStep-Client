<template>
	<view class="layout">
		<view class="bg">
			<view class="text">注册</view>
			<image src="/static/image/welcome.png" mode="aspectFill"></image>
		</view>
		<view class="form">
			<view class="content">
				<image src="/static/image/account.png" mode="aspectFill"/>
				<view class="account">
					<input :value="account" @input="onIptAccount" type="number" maxlength="11" placeholder="请输入手机号"/>
				</view>
			</view>
			<view class="content">
				<image src="/static/image/passwd.png" mode="aspectFill"/>
				<view class="pwd">
					<input :value="pwd" @input="onIptPwd" password maxlength="12" type="safe-password" placeholder="6-12数字或字母"/>
				</view>
			</view>
			<view class="content">
				<image src="/static/image/code.png" mode="aspectFill"/>
				<view class="code">
					<input :value="verifyCode" @input="onIptVerifyCode" type="number" placeholder="请输入验证码"/>
					<view class="vBorder"/>
					<view @click="getVerifyCode" class="getCode">
						 {{isGettingCode ? `${codeCount} 秒后重试` : '获取验证码'}}
					</view>
				</view>
			</view>
		</view>
		<view @click="onRegister" class="btn">
			<ssc-button-primary text="注册"/>
		</view>
		<view @click="onLogin" class="btn">
			<ssc-button-default text="登录"/>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, callWithErrorHandling } from 'vue';
import {requestCodeAPI, verifyCodeAPI, registerUserAPI} from './api.js';
import { formatDateTime } from '@/utils/timeUtil.js';

const account = ref("")  //账号
const pwd = ref("") //密码
const verifyCode = ref("") //验证码
const isGettingCode = ref(false) //正在获取验证码
const codeCount = ref(60) //倒计时

//输入账号
function onIptAccount(e){account.value = e.detail.value;}

//输入密码
function onIptPwd(e){pwd.value = e.detail.value;}

//输入验证码
function onIptVerifyCode(e){verifyCode.value = e.detail.value;}

// 验证手机号
function validAccount() {
	// 正则表达式，匹配11位手机号
	const regex = /^1[13456789]\d{9}$/; 
	if(!regex.test(account.value)){
		uni.showToast({
			title: '手机号不合规',
			icon: 'none'
		})
		return false;
	}
	return true;
}

// 验证密码
function validPwd() {
	// 正则表达式，匹配6-12位数字或字母
	const regex = /^[0-9a-zA-Z]{6,12}$/;
	if(!regex.test(pwd.value)){
		uni.showToast({
			title: '密码不合规',
			icon: 'none',
		})
		return false;
	}
	return true;
}

// 检验验证码
function validateCode() {
	// 正则表达式，匹配4位数字
	const regex = /^[0-9]{4}$/;
	if(!regex.test(verifyCode.value)){
		uni.showToast({
			title: '验证码不合规',
			icon: 'none',
		})
		return false;
	}
	return true;
}

// 获取验证码
function getVerifyCode(){
	//检验手机号
	if(!validAccount()) return
	
	//正在获取验证码
	if(isGettingCode.value) return
	
	// 发送请求获取验证码
	console.log('发送验证码');
	requestCodeAPI({
		phone:account.value
	}).then(res=>{
		isGettingCode.value = true;
		const timer = setInterval(() => {
			if (codeCount.value <= 1) {
				clearInterval(timer);
				isGettingCode.value = false;
				codeCount.value = 60;
			} else {
				codeCount.value--;
			}
		}, 1000);
	}).catch(err=>{
		console.log(err);
	})
}

// 注册
async function onRegister(){
	//检验手机号
	if(!validAccount()) return
	//检验密码
	if(!validPwd()) return
	//检验验证码
	if(!validateCode()) return
	
	let codeRes = await verifyCodeAPI({
		phone:account.value,
		code:verifyCode.value
	})
	
	if(codeRes.code == 1){
		console.log('注册用户');
		let registerRes = await registerUserAPI({
			userType:'0',
			account:account.value,
			password:pwd.value,
			createBy:account.value,
			createTime:formatDateTime(new Date())
		})
		if(registerRes.code == 1){
			uni.redirectTo({
				url: `/pages/login/login?account=${account.value}&pwd=${pwd.value}`
			});
		}
	}
}

//登录
const onLogin = () => {
	if(validAccount()&&validPwd()){
		uni.redirectTo({
			url: `/pages/login/login?account=${account.value}&pwd=${pwd.value}`
		});
	}else{
		uni.redirectTo({
			url: '/pages/login/login'
		});
	}
}	
	
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
				.account, .pwd{
					width: 520rpx;
					border-bottom: 1rpx solid $ssc-color-primary;
					input{
						height: 100rpx;
						padding: 0 20rpx;
					}
				}
				.code{
					width: 520rpx;
					border-bottom: 1rpx solid $ssc-color-primary;
					display: flex;
					justify-content: space-between;
					align-items: center;
					input{
						height: 100rpx;
						padding: 0 20rpx;
					}
					.vBorder{
						width: 2rpx;
						height: 50rpx;
						background-color:  $ssc-color-primary;
					}
					.getCode{
						width: 250rpx;
						text-align: end;
						color: $ssc-color-primary;
					}
				}
				image{
					width: 50rpx;
					height: 50rpx;
					padding-right: 20rpx;
				}
			}
		}
		.btn{
			width: 600rpx;
			margin-bottom: 50rpx;
		}

	}
	
</style>
