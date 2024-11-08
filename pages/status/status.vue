<template>
	<view class="bg">
		<view class="header">
			<view class="text"></view>
			<view class="options">
				<view class="option" @click="onActivityHistory">
					<ssc-icon url="/static/image/option/option_history.png"></ssc-icon>
				</view>
				<view class="option" @click="onDeviceManage">
					<ssc-icon url="/static/image/option/option_device.png"></ssc-icon>
				</view>
				<view class="option" @click="onDeviceFilter">
					<ssc-icon url="/static/image/option/option_filter.png"></ssc-icon>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="img">
				<image :src="activityImg" mode="aspectFill"></image>
			</view>
			<view :style="{color:descColor}" class="desc">{{activityDes}}</view>
		</view>
		<view v-if="isFilter" class="rg">
			<radio-group name="" @change="onDeviceChanged">
				<label v-for="(device, index) in devices" :key="device.deviceCode">
					<radio :value="device.deviceCode" :checked="device.deviceCode==deviceCode"/>{{device.deviceLocation}}
				</label>
			</radio-group>
		</view>
	</view>
</template>

<script setup>
import {onShow, onHide} from '@dcloudio/uni-app';
import {onMounted, onUnmounted, ref } from 'vue';
import { getDeviceListAPI } from './api.js'

let timer = null;
const activityImg = ref(''); //活动对应的图片
const activityDes = ref(''); //活动描述
const descColor = ref(''); //活动描述对应的文字颜色
const isFilter = ref(false); //是否筛选
const isDetect = ref(false); //是否检测到目标
const messageData = ref({}); //ws请求数据
const devices = ref([]); //可用设备列表
const deviceCode = ref(''); //当前设备编号
const account = ref(uni.getStorageSync('userInfo').account)
const userCode = ref(uni.getStorageSync('userInfo').userCode);

// 发送ws消息
function sendMsg(deviceCode){
	messageData.value = {
		userCode: userCode.value,
		deviceCode: deviceCode
	};
	uni.sendSocketMessage({
		data:JSON.stringify(messageData.value)
	})
}

// 开启定时器
function startTimer(deviceCode) {
	sendMsg(deviceCode)
	clearInterval(timer);
	timer = setInterval(() => {
		sendMsg(deviceCode)
	}, 5000);
};

// 结束定时器
function stopTimer() {
	if (timer !== null) {
		clearInterval(timer);
		timer = null;
	}
};

// 获取可用设备列表
async function loadDevices() {
	let result = await getDeviceListAPI({
		account: account.value
	})
	if(result.code == 1) {
		devices.value = result.data
		return devices.value[0].deviceCode;
	}
}

onMounted(()=>{
	uni.connectSocket({
		url: 'ws://localhost:8080/wsserver/' + userCode.value
	});
	uni.onSocketOpen(function (res) {
		console.log('WebSocket连接已打开！');
		uni.showToast({
			title:'服务已连接',
			icon:'success'
		})
	});
	uni.onSocketMessage(function (res) {
		console.log('收到服务器内容：' + res.data);
		const activity = JSON.parse(res.data);
		if(activity.hasActivity) {
			activityImg.value = '/static/image/activity/activity_'+ activity.activityName.toLowerCase() + '.png'
			activityDes.value = activity.activityDescription
			if(activity.activityType==0) descColor.value = '#99E265';
			else if(activity.activityType==1) descColor.value = '#f0ad4e';
			else descColor.value = '#dd524d';
			
		}else{
			activityImg.value = '/static/image/activity/activity_no.png';
			activityDes.value = '未检测到目标'
			descColor.value = '#707070'
		}
	});
})

onShow(async ()=>{
	if (deviceCode.value == '') {
		deviceCode.value = await loadDevices()
	}
	startTimer(deviceCode.value)
})

onHide(()=>{
	stopTimer()
})

onUnmounted(()=>{
	uni.closeSocket({
		complete: () => {
			stopTimer()
		}
	});
})

function onActivityHistory(){
	
}

function onDeviceManage(){
	uni.navigateTo({
		url:'/pages/list-device/list-device'
	})
}

function onDeviceFilter(){
	isFilter.value = !isFilter.value;
}

// 切换设备
function onDeviceChanged(e){
	deviceCode.value = e.detail.value;
	startTimer(e.detail.value)
}

</script>

<style lang="scss">
	.bg{
		width: 100%;
		height: 100vh;
		background-color: $ssc-color-bg;
		.header{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100rpx;
			.text{
				width: 500rpx;
				height: 60rpx;
			}
			.options{
				width: 180rpx;
				height: 60rpx;
				padding-inline-end:20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
		.content{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			margin-top: 100rpx;
			.img{
				width: 500rpx;
				height: 750rpx;
				background-color: #fff;
				border-radius: $ssc-border-radius-circle; //圆形
				overflow: hidden; //给父级加上圆角时隐藏图像
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 80%;
					height: 80%;
				}
			}
			.desc{
				width: 750rpx;
				margin-top: 50rpx;
				font-size: $ssc-font-size-subtitle;
				line-height: $ssc-font-size-subtitle;
				text-align: center;
				padding-block: 20rpx;
			}
		}
		.rg {
			position: absolute;
			top: 100rpx;
			right: 20rpx;
			background-color: #fff; /* 可以根据需要调整背景颜色 */
			padding: 10rpx; /* 内边距 */
			border-radius: 10rpx; /* 边框 */
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
			z-index: 1000; /* 确保容器在其他内容之上 */
			radio-group {
			    display: flex;
			    flex-direction: column; /* 垂直方向排列 */
				label{
					width: 200rpx;
					height: 50rpx;
					padding: 10rpx;
				}
			}
		}
		
		
	}
</style>
