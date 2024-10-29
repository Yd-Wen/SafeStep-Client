<template>
	<view class="bg">
		<view class="body">
			<view class="hint">信息</view>
			<view class="card">
				<view class="option">
					<view class="title">设备名称</view>
					<input :value="deviceName" @input="onIptName" class="contentInput" maxlength="20"/>
				</view>	
				<view class="description">
					<view class="title">设备描述</view>
					<textarea :value="deviceDescription" @input="onIptDescription" class="content" placeholder="平安步，步步平安！"/>
				</view>	
			</view>
			<view class="hint">位置</view>
			<view class="card">
				<view class="option">
					<view class="title">设备位置</view>
					<input :value="deviceLocation" @input="onIptLocation" class="contentInput" maxlength="20"/>
				</view>	
			</view>
			<view class="hint">状态</view>
			<view class="card">
				<view class="status">
					<view class="title">设备状态</view>
					<switch :checked="deviceStatus" @change="onChangeStatus" />
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
	</view>
</template>

<script setup>
import { ref } from "vue";
import { registerDeviceAPI } from "./api.js";

const deviceName = ref("");
const deviceDescription = ref("");
const deviceLocation = ref("");
const deviceStatus = ref(false);

function onIptName(e) {
	deviceName.value = e.detail.value;
}

function onIptDescription(e) {
	deviceDescription.value = e.detail.value;
}

function onIptLocation(e) {
	deviceLocation.value = e.detail.value;
}

function onChangeStatus(e) {
	deviceStatus.value = e.detail.value;
}

async function onSubmit() {
	// 校验设备信息
	if(deviceLocation.value=='') {
		uni.showToast({
			title:'位置不能为空',
			icon:'error'
		})
		return
	}
	// 提交设备信息
	let result = await registerDeviceAPI({
		deviceName: deviceName.value,
		deviceDescription: deviceDescription.value,
		deviceLocation: deviceLocation.value,
		deviceStatus: deviceStatus.value?1:0
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
	.bg{
		width: 100%;
		height: 100vh;
		background-color: $ssc-color-bg;
		.header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-inline:20rpx;
			widt: 100%;
			height: 100rpx;
			.text{
				width: 500rpx;
				height: 60rpx;
				line-height: 60rpx;
				color: $ssc-color-title;
				font-size: $ssc-font-size-title;
			}
			.options{
				width: 120rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
		
		.body{
			width: 100%;
			padding-inline: 20rpx;
			.hint{
				width: 100%;
				height: 50rpx;
				margin: 10rpx;
				padding-inline-start:20rpx;
				color: $ssc-color-subtitle;
				font-size: $ssc-font-size-subtitle;
			}
			.card{
				border: 2rpx solid $ssc-color-card;
				background-color: $ssc-color-card;
				border-radius: 20rpx;
				padding-inline:20rpx;
				.option{
					margin-block:20rpx;
					display: flex;
					align-items: center; //垂直居中
					.title{
						width: 150rpx;
						margin-inline-end: 20rpx;
						color: $ssc-color-paragraph;
						font-size: $ssc-font-size-paragraph;
					}
					.contentInput{
						width: 500rpx;
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
						width: 150rpx;
						margin-inline-end: 20rpx;
						color: $ssc-color-paragraph;
						font-size: $ssc-font-size-paragraph;
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
	}
</style>
