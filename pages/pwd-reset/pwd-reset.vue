<template>
	<view class="layout">
		<view class="bg">
			<view class="text">重置密码</view>
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
				<image src="/static/image/code.png" mode="aspectFill"/>
				<view class="code">
					<input :value="verifyCode" @input="onIptVerifyCode" type="number" placeholder="请输入验证码"/>
					<view class="vBorder"/>
					<view @click="getVerifyCode" class="getCode">
						 {{isGettingCode ? `${codeCount} 秒后重试` : '获取验证码'}}
					</view>
				</view>
			</view>
			<view class="content">
				<image src="/static/image/passwd.png" mode="aspectFill"/>
				<view class="newPwd">
					<input :value="pwd" @input="onIptPwd" password type="safe-password" maxlength="12" placeholder="请输入新密码"/>
				</view>
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
import { ref } from 'vue';
import {requestCodeAPI, verifyCodeAPI, resetPwdAPI} from './api.js';
import {validAccount, validPwd, validVerifyCode} from '@/utils/stringUtil.js'

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

// 获取验证码
function getVerifyCode(){
	//检验手机号
	if(!validAccount(account.value)) return
	
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

async function onSubmit() {
	//检验手机号、密码和验证码
	if(!validAccount(account.value)||!validPwd(pwd.value)||!validVerifyCode(verifyCode.value)) return
	
	let codeRes = await verifyCodeAPI({
		phone:account.value,
		code:verifyCode.value
	})
	
	if(codeRes.code == 1){
		console.log('重置密码');
		let resetPwdRes = await resetPwdAPI({
			account:account.value,
			password:pwd.value
		})
		if(resetPwdRes.code == 1){
			// 保存用户信息到本地
			uni.setStorageSync('userInfo', {
				account: account.value,
				password: pwd.value
			})
			// 延迟 1 秒后跳转登录页面
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}, 1000)
		}
	}
}

function onCancel() {
	uni.navigateBack()
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
				width: 300rpx;
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
			height: 600rpx;
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
				margin-bottom: 50rpx;
				padding: 0 10rpx;
				display: flex;
				align-items: center;
				.account{
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
				.newPwd{
					width: 520rpx;
					border-bottom: 1rpx solid $ssc-color-primary;
					input{
						height: 100rpx;
						padding: 0 20rpx;
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

