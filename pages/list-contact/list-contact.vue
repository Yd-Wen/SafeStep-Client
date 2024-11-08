<template>
	<view class="bg">
		<view class="header">
			<view class="text">{{userName}}的联系人</view>
			<view class="add" @click="onAddContact">
				<ssc-icon url="/static/image/option/option_add.png"></ssc-icon>
			</view>
		</view>
		<view class="list" v-for="(contact, index) in contacts" :key="contact.userCode" >
			<view class="item">
				<ssc-item-contact :contact="contact"/>
				<view class="separator" v-if="index !== contacts.length - 1">
					<view class="space"></view>
					<view class="border"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app'
import { getContactListAPI } from './api.js'

	
const contacts = ref([]);
const account = ref(uni.getStorageSync('userInfo').account)
const userName = ref(uni.getStorageSync('userInfo').userName) || "用户"+account.value

async function loadContacts() {
	let result = await getContactListAPI({
		account: account.value
	})
	if(result.code == 1) contacts.value = result.data
}

function onAddContact() {
	uni.navigateTo({
		url:'/pages/register-contact/register-contact'
	})
}	
	
onShow(() => {
	loadContacts()
})
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
			widt: 100%;
			height: 100rpx;
			padding-inline: 20rpx;
			.text{
				width: 500rpx;
				height: 60rpx;
				line-height: 60rpx;
				color: $ssc-color-title;
				font-size: $ssc-font-size-title;
			}
			.add{
				width: 60rpx;
				height: 60rpx;
			}
		}
		.list{
			padding: 10rpx 35rpx;
			.item{
				.separator{
					width: 100%;
					height:2rpx;
					display: flex;
					justify-content: space-around;
					.space{
						width:130rpx;
						height:2rpx;
					}
					.border{
						width: 550rpx;
						height:2rpx;
						border-bottom:2rpx solid $ssc-color-border-grey
					}
				}
			}
		}
	}
</style>
