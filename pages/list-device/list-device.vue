<template>
	<view class="header">
		<view class="text">{{userName}}的设备</view>
		<view class="add" @click="onAddDevice">
			<ssc-icon url="/static/image/option_add.png"></ssc-icon>
		</view>
	</view>
	<view class="list">
		<ssc-item-device v-for="device in devices" :key="device.deviceCode" :device="device"/>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getDeviceListAPI } from './api.js'

const devices = ref([]);
const account = ref(uni.getStorageSync('userInfo').account)
const userName = ref(uni.getStorageSync('userInfo').userName) || "用户"+account.value

async function loadDevices() {
	let result = await getDeviceListAPI({
		account: account.value
	})
	if(result.code == 1) devices.value = result.data
	console.log(devices.value)
}

function onAddDevice() {
	
}

onLoad(() => {
	loadDevices()
})

	
</script>

<style lang="scss" scoped>
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
			color: $ssc-color-subtitle;
			font-size: $ssc-font-size-subtitle;
		}
		.add{
			width: 60rpx;
			height: 60rpx;
		}
	}
	.list{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		padding: 20rpx;
	}
</style>
