<template>
	<view class="bg">
		<view class="today">
			<ssc-title class="ssc-title">
				<template #name>今日活动</template>
			</ssc-title>
			<view class="content">
				<view class="title">
					<view class="text">{{dateStr}}活动风险统计</view>
					<uni-icons type="info" size="14" @click="onDayInfo"></uni-icons>
				</view>
				<qiun-data-charts class="chart" type="column" :opts="opts" :chartData="chartData" :ontouch="true"/>
			</view>
		</view>
		<view class="latest">
			<ssc-title class="ssc-title">
				<template #name>最近活动</template>
				<template #custom>
					
				</template>
			</ssc-title>
			<view class="content">
				<view class="box" v-for="(item, index) in activities" :key="index">
					<view class="img">
						<image class="image" :src="item.img" mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="activity" :style="{ color: item.type }">{{item.desc}}</view>
						<view class="time">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getActivityAPI, getDeviceListAPI } from './api.js'
import { getDayStart, getWeekStart, getMonthStart, getYearStart, getTimeNow, getDateNow, getTimeDiff, isNowExpired } from "@/utils/timeUtil.js";
import { opts } from"@/utils/imageUtil.js"

const account = ref(uni.getStorageSync('userInfo').account)
const devices = ref([]); //可用设备列表
const dateStr = ref(getDateNow());

const chartData = ref({});
const activities = ref({});

const needRequest = ref(false);

// 日间统计提示
function onDayInfo(){
	uni.showToast({
		icon: "none",
		title: "风险等级：1 正常；2 危险；3 跌倒"
	})
}

// 获取可用设备列表
async function loadDevices() {
	let result = await getDeviceListAPI({
		account: account.value
	})
	if(result.code == 1) {
		return result.data;
	}
}

// 获取历史活动
async function loadActivities(){
	// 查询条件
	const query = ref({
		deviceCodes: devices.value.map(device => device.deviceCode),
		startTime: getYearStart(),
		// TODO:
		// startTime: getDayStart(),
		endTime: getTimeNow(),
		sortOrder: 'ASC'
	})
	// 查询活动
	let result = await getActivityAPI(query.value)
	if (result.code ==1 ){
		return result.data;
	}
}

// 合并设备和活动的网络请求并更新缓存（保证最新设备）
async function request(){
	// 获取设备
	devices.value = await loadDevices();
	// 查询活动
	let acts = await loadActivities();
	// 缓存
	uni.setStorageSync('activityInfo', {
		device: devices.value,
		activity: acts,
		requestTime: getTimeNow(),
		expiration: 600 * 1000 // 10 min
	})
	return acts;
}

// 数据转换和绘图
function drawActHis(res){
	let dataToday = {
		categories: res.map(item => {
			// 创建一个 Date 对象
			const date = new Date(item.startTime);
			// 使用 toLocaleTimeString 方法并指定时区
			return date.toLocaleTimeString('zh-CN', {
				timeZone: 'Asia/Shanghai',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false // 使用24小时制
			});
		}),
		series: [
			{
				name: '活动',
				data: res.map(item => {
					return {
						name: item.startTime,
						value: item.activityType + 1,
						color: item.activityType === 0 ? "#28C76F" : 
							   item.activityType === 1 ? "#f0ad4e" : "#dd524d"
					};
				})
			}
		]
	}
	chartData.value = JSON.parse(JSON.stringify(dataToday));
}

// 最新活动数据转换
function getActLatest(res){
	// 获取res的最后三个元素
	const lastThreeItems = res.slice(-3).reverse();
	activities.value = lastThreeItems.map(item => {
		return {
			img: '/static/image/activity/activity_'+ item.activityName.toLowerCase() + '.png',
			type: item.activityType === 0 ? "#28C76F" : 
					item.activityType === 1 ? "#f0ad4e" : 
					item.activityType === 2 ? "#dd524d" : "#000",
			desc: item.activityDescription,
			time: getTimeDiff(item.startTime)
		}
	})
}

onMounted(async ()=>{	
	// 尝试从缓存中读取数据
	const cachedData = uni.getStorageSync('activityInfo');
	if (!cachedData || !cachedData.requestTime || !cachedData.expiration || isNowExpired(cachedData.requestTime, cachedData.expiration)) {
		// 如果缓存无效或不存在，则需要进行网络请求
		needRequest.value = true;
	}else{
		needRequest.value = false;
	}
	
	// 检查缓存以获取活动
	let acts;
	if (needRequest.value) {
		console.log('Request Expired');
		// 过期发起新的网络请求
		acts = await request();
	} else {
		console.log('Get Storage');
		// 未过期则直接从缓存获取活动
		acts = uni.getStorageSync('activityInfo').activity;
	}
	// 绘图
	drawActHis(acts);
	// 最新活动
	getActLatest(acts);
})

</script>

<style lang="scss" scoped>
	.bg{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		.today{
			width: 710rpx;
			height: 700rpx;
			margin: 30rpx auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			.ssc-title{
				height: 50rpx;
			}
			.content{
				width: 100%;
				flex: 1;
				margin: 30rpx 10rpx 0 0;
				padding: 10rpx;
				border-radius: 30rpx;
				box-shadow:0 0 50rpx rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				.title{
					height: 50rpx;
					display: flex;
					align-items: center;
					.text{
						line-height: 50rpx;
						font-size: $ssc-font-size-paragraph;
						color: $ssc-color-paragraph;
					}
				}
				.chart{
					width: 100%;
					height: 100%;
				}
			}
		}
		.latest{
			width: 100%;
			flex: 1;
			margin-top: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			background-color: $ssc-color-primary-light;
			.ssc-title{
				height: 50rpx;
				margin-top: 30rpx;
				margin-left: 20rpx;
				color: #fff;
			}
			.content{
				width: 100%;
				flex: 1;
				margin-top: 30rpx;
				border-radius: 30rpx 30rpx 0 0;
				box-shadow:0 0 50rpx rgba(0, 0, 0, 0.1);
				background-color: #fff;
				.box{
					width: 100%;
					height: 150rpx;
					display: flex;
					align-items: center;
					margin-top: 10rpx;
					padding: 10rpx 50rpx 0 50rpx;
					.img{
						width: 150rpx;
						height: 100%;
						.image{
							width: 100%;
							height: 100%;
						}
					}
					.text{
						flex: 1;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						align-items: flex-start;
						padding-left: 30rpx;
						.activity{
							line-height: $ssc-font-size-paragraph;
							font-size: $ssc-font-size-paragraph;
						}
						.time{
							line-height: $ssc-font-size-hint;
							color: $ssc-color-hint;
							font-size: $ssc-font-size-hint;
						}						
					}
				}
			}
		}
	}
</style>
