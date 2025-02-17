<template>
	<view class="layout">
		<view class="bg">
			<view class="text">修改密码</view>
			<image src="/static/image/app/welcome.png" mode="aspectFill"></image>
		</view>
		<view class="form">
			<view class="content">
				<image src="/static/image/app/passwd.png" mode="aspectFill"/>
				<view class="pwd">
					<input :value="oldPwd" @input="onIptOldPwd" password type="safe-password" maxlength="12" placeholder="请输入原密码"/>
				</view>
			</view>
			<view class="content">
				<image src="/static/image/app/passwd_new.png" mode="aspectFill"/>
				<view class="pwd">
					<input :value="newPwd" @input="onIptNewPwd" password type="safe-password" maxlength="12" placeholder="请输入新密码"/>
				</view>
			</view>
			<view class="content">
				<image src="/static/image/app/passwd_new.png" mode="aspectFill"/>
				<view class="pwd">
					<input :value="newConfirmPwd" @input="onIptNewConfirmPwd" password type="safe-password" maxlength="12" placeholder="请确认新密码"/>
				</view>
			</view>
		</view>
		<view class="btn">
			<ssc-button-primary @click="onSubmit" text="提交"/>
		</view>
		<view class="btn">
			<ssc-button-default  @click="onCancel" text="取消"/>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {verifyPwdAPI, resetPwdAPI} from './api.js';
import {validAccount, validPwd} from '@/utils/stringUtil.js'

const oldPwd = ref("")  //原密码
const newPwd = ref("") //新密码
const newConfirmPwd = ref("") //确认新密码


//输入原密码
function onIptOldPwd(e){oldPwd.value = e.detail.value;}

//输入新密码
function onIptNewPwd(e){newPwd.value = e.detail.value;}

//输入确认新密码
function onIptNewConfirmPwd(e){newConfirmPwd.value = e.detail.value;}

//提交
async function onSubmit(){
	//检验密码
	if(!validPwd(oldPwd.value)||!validPwd(newPwd.value)||!validPwd(newConfirmPwd.value)) return
	//两次新密码一致
	if(newPwd.value!== newConfirmPwd.value){
		uni.showToast({title: '两次密码不一致', icon: 'none'})
		return
	}
	//获取账号信息
	let userInfo = uni.getStorageSync('userInfo')
	if (userInfo) {
	      // 验证原密码
		  let result = await verifyPwdAPI({
	      	account: userInfo.account,
			password: oldPwd.value
	      })
		  // 验证成功
		  if(result.code == 1){
			  console.log("修改密码");
			  let result = await resetPwdAPI({
				  account:userInfo.account,
				  password:newPwd.value
			  })
			  if(result.code == 1){
			  	// 保存用户信息到本地
			  	uni.setStorageSync('userInfo', {
			  		account: userInfo.account,
			  		password: newPwd.value
			  	})
			  	// 延迟 1 秒后返回上一页
			  	setTimeout(() => {
			  		uni.navigateBack()
			  	}, 1000)
			  }
		  }
	      
	} else {
		console.log('No userInfo found in storage.');
	}
}

//取消
function onCancel(){
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
				.pwd{
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


