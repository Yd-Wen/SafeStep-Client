<template>
	<view class="bg">
		<view class="header">
			<view class="text">{{contact.userName}}</view>
			<view class="options">
				<view class="option" @click="onUpdateContact">
					<ssc-icon url="/static/image/option/option_update.png"></ssc-icon>
				</view>
				<view class="option" @click="onDeleteContact">
					<ssc-icon url="/static/image/option/option_delete.png"></ssc-icon>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="hint">信息</view>
			<view class="card">
				<view class="option">
					<view class="title">编号</view>
					<view class="content">{{contact.userCode}}</view>
				</view>	
				<view class="option">
					<view class="title">名称</view>
					<input :disabled="!isEdit" :value="contact.userName" @input="onIptName" class="contentInput" maxlength="20"/>
				</view>	
				<view class="option">
					<view class="title">电话</view>
					<input :disabled="!isEdit" :value="contact.contactPhone" @input="onIptPhone" class="contentInput" maxlength="11"/>
				</view>	
				<view class="description">
					<view class="title">描述</view>
					<textarea :disabled="!isEdit" :value="contact.userDescription" @input="onIptDescription" class="content" placeholder="步步安，步步平安！"/>
				</view>	
			</view>
			<view v-if="isEdit" class="update">
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
import { onLoad } from "@dcloudio/uni-app";
import { updateContactAPI, deleteContactAPI } from "./api.js";

const contact = ref({});
const isEdit = ref(false);
const isUpdate = ref(false);

const userName = ref("");
const userDescription = ref("");
const contactPhone = ref("");

onLoad(async (option) => {
	// 解析对象
	contact.value = JSON.parse(option.contact);
})

function onUpdateContact() {
	isEdit.value = true;
}

function deleteOption() {
	return new Promise((resolve, reject)=>{
		uni.showModal({
			title: '提示',
			content: '确定删除该联系人？',
			success: (res) => {
				resolve(res.confirm)
			}
		})
	})
}

async function onDeleteContact(){
	let deleteRes = await deleteOption()
	if(deleteRes) deleteRes = await deleteContactAPI({userCode:contact.value.userCode})
	if(deleteRes.code == 1) {
		// 延迟 1 秒后返回上一页
		setTimeout(() => {
			uni.navigateBack();
		}, 1000);
	}
}

function onIptName(e) {
	userName.value = e.detail.value;
	isUpdate.value = true;
}

function onIptPhone(e) {
	contactPhone.value = e.detail.value;
	isUpdate.value = true;
}

function onIptDescription(e) {
	userDescription.value = e.detail.value;
	isUpdate.value = true;
}

async function onSubmit() {
	if(!isUpdate.value) return;
	contact.value.userName = userName.value;
	contact.value.contactPhone = contactPhone.value;
	contact.value.userDescription = userDescription.value;
	// 提交联系人信息
	let result = await updateContactAPI(contact.value);
	if (result.code != 1) return; // 如果提交失败，退出函数
	// 延迟 1 秒后返回上一页
	setTimeout(() => {
		uni.navigateBack();
	}, 1000);
}

function onCancel() {
	isEdit.value = false;
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
				overflow: hidden; // 溢出隐藏
				text-overflow: ellipsis; // 文本溢出时显示省略号
				white-space: nowrap; // 设置块级元素内多行文本为单行
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
						padding-left: 10rpx;
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
						margin-block-end:20rpx;
						padding: 10rpx;
						color: $ssc-color-paragraph;
						font-size: $ssc-font-size-paragraph;
						background-color: $ssc-color-text-bg;
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
