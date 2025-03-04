<template>
	<view class="body">
		<view class="hint header">信息</view>
		<view class="card">
			<view class="option">
				<view class="title">姓名</view>
				<input :value="userName" @input="onIptName" class="contentInput" maxlength="20"/>
			</view>	
			<view class="option">
				<view class="title">电话</view>
				<input :value="contactPhone" @input="onIptPhone" class="contentInput" maxlength="11"/>
			</view>	
			<view class="description">
				<view class="title">描述</view>
				<textarea :value="userDescription" @input="onIptDescription" class="content" placeholder="平安步，步步平安！"/>
			</view>	
		</view>
		<view class="update">
			<view class="btn">
				<ssc-button-primary @click="onSubmit" text="提交"/>
			</view>
			<view class="btn">
				<ssc-button-default @click="onCancel" text="取消"/>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { registerContactAPI} from "./api.js";
import { validAccount } from '@/utils/stringUtil.js'

const userName = ref("");
const userDescription = ref("");
const contactPhone = ref("");

function onIptName(e) {
	userName.value = e.detail.value;
}

function onIptPhone(e) {
	contactPhone.value = e.detail.value;
}

function onIptDescription(e) {
	userDescription.value = e.detail.value;
}

async function onSubmit() {
	// 校验联系人信息
	if(userName.value=='') {
		uni.showToast({
			title:'姓名不能为空',
			icon:'error'
		})
		return
	}
	if(!validAccount(contactPhone.value)) return;
	
	// 提交联系人信息
	let result = await registerContactAPI({
		userName: userName.value,
		contactPhone: contactPhone.value,
		userDescription: userDescription.value
	});
	if (result.code != 1) return; // 如果提交失败，退出函数
	// 延迟 1 秒后返回上一页
	setTimeout(() => {
		uni.navigateBack();
	}, 1000);
}

function onCancel() {
	uni.navigateBack()
}

</script>

<style lang="scss" scoped>	
	.body{
		width: 100%;
		height: 100vh;
		background-color: $ssc-color-bg;	
		padding-top: 1rpx;
		padding-inline: 20rpx;
		.hint{
			width: 100%;
			height: 50rpx;
			margin: 30rpx 0 10rpx 0;
			padding-inline-start:20rpx;
			color: $ssc-color-subtitle;
			font-size: $ssc-font-size-subtitle;
		}
		.hint.header{
			margin-top: 10rpx;
		}
		.card{
			border: 2rpx solid $ssc-color-card;
			background-color: $ssc-color-card;
			border-radius: 20rpx;
			padding-inline:20rpx;
			.option{
				margin-block:20rpx;
				display: flex;
				align-items: flex-start;
				.title{
					width: 100rpx;
					margin-inline-end: 5rpx;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;
					line-height: 80rpx;
				}
				.contentInput{
					flex: 1;
					height: 80rpx;
					border: none;
					border-bottom: 1rpx solid $ssc-color-primary;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;
				}
				.content{
					width: 500rpx;
					height: 80rpx;
					padding-left: 10rpx;
					display: flex;
					align-items: center;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;				
					background-color: $ssc-color-disabled;
				}
			}
			.description{
				width: 100%;
				.title{
					width: 100rpx;
					margin-inline-end: 20rpx;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;
					line-height: 80rpx;
				}
				.content{
					width: 645rpx;
					height: 150rpx;
					margin-top: 20rpx;
					padding: 10rpx;
					margin-block-end:20rpx;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;
					background-color: $ssc-color-text-bg;
				}
			}
			.status{
				margin-block:20rpx;
				display: flex;
				align-items: center; //垂直居中
				justify-content: space-between;
				.title{
					width: 150rpx;
					margin-inline-end: 20rpx;
					color: $ssc-color-paragraph;
					font-size: $ssc-font-size-paragraph;
				}
				switch{
					
				}
			}
		}
		.update{
			display: flex; 
			align-items: center; //水平居中
			justify-content: center; //垂直居中
			flex-direction: column; //换行显示
			margin-top: 50rpx;
			.btn{
				width: 600rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
