<template>
	<view class="bg">
		<view class="header">
			<view class="text">{{userName}}的报警历史</view>
			<view class="options">
				<view class="option" @click="onOmissionAlarm">
					<ssc-icon url="/static/image/option/option_feedback.png"></ssc-icon>
				</view>
				<view class="option" @click="onResultFilter">
					<ssc-icon url="/static/image/option/option_result.png"></ssc-icon>
				</view>
				<view class="option" @click="onLocationFilter">
					<ssc-icon url="/static/image/option/option_location.png"></ssc-icon>
				</view>
				<view class="option" @click="onTimeFilter">
					<ssc-icon url="/static/image/option/option_time.png"></ssc-icon>
				</view>
			</view>
		</view>
		<view v-if="isTimeFilter" class="rg time">
			<radio-group name="" @change="onTimeChanged">
				<label v-for="(time, index) in times" :key="time.timeCode">
					<radio :value="time.timeCode" :checked="time.timeCode==timeCode"/>{{time.timeContent}}
				</label>
			</radio-group>
		</view>
		<view v-if="isLocationFilter" class="rg location">
			<radio-group name="" @change="onLocationChanged">
				<label key="0">
					<radio value="0" :checked="deviceCode=='0'"/>所有
				</label>
				<label v-for="(device, index) in devices" :key="device.deviceCode">
					<radio :value="device.deviceCode" :checked="device.deviceCode==deviceCode"/>{{device.deviceLocation}}
				</label>
			</radio-group>
		</view>
		<view v-if="isResultFilter" class="rg result">
			<radio-group name="" @change="onResultChanged">
				<label v-for="(result, index) in results" :key="result.resultCode">
					<radio :value="result.resultCode" :checked="result.resultCode==resultCode"/>{{result.resultContent}}
				</label>
			</radio-group>
		</view>
		<view class="list" v-for="(alarm, index) in alarms" :key="alarm.alarmCode" >
			<view class="item">
				<ssc-item-alarm :alarm="alarm" />
				<view class="separator" v-if="index !== alarms.length - 1">
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
import { getDeviceListAPI, getAlarmListAPI } from './api.js'
import { getDayStart, getWeekStart, getMonthStart, getYearStart, getTimeDiff, getTimeNow } from "@/utils/timeUtil.js";
	
const feedbackColor = ref(''); // 报警反馈对应的文字颜色
const alarms = ref([]);
const account = ref(uni.getStorageSync('userInfo').account)
const userName = ref(uni.getStorageSync('userInfo').userName) || "用户"+account.value
const devices = ref([]);
const query = ref({
	fltDev: [],
	fltStartTime: null,
	fltEndTime: null,
	fltRes: null
}); // 报警查询条件
const isTimeFilter = ref(false);
const isLocationFilter = ref(false);
const isResultFilter = ref(false);
const timeCode = ref('0'); //当前时间编号
const deviceCode = ref('0'); //当前设备编号
const resultCode = ref('4'); //当前结果编号
const times = ref([
	{
		timeCode: '0',
		timeContent: '所有'
	},
	{
		timeCode: '1',
		timeContent: '今日'
	},
	{
		timeCode: '2',
		timeContent: '本周'
	},
	{
		timeCode: '3',
		timeContent: '本月'
	},
	{
		timeCode: '4',
		timeContent: '本年'
	}
]);
const results = ref([
	{
		resultCode: '4',
		resultContent: '所有'
	},
	{
		resultCode: '0',
		resultContent: '未处理'
	},
	{
		resultCode: '1',
		resultContent: '已处理'
	},
	{
		resultCode: '2',
		resultContent: '误报'
	},
	{
		resultCode: '3',
		resultContent: '漏报'
	}
]);

// 获取可用设备列表
async function loadDevices() {
	let result = await getDeviceListAPI({
		account: account.value
	})
	if(result.code == 1) {
		return result.data;
	}
}

// 获取报警历史
async function loadAlarms() {
	let result = await getAlarmListAPI({
		deviceCodes: Array.isArray(query.value.fltDev)? query.value.fltDev: [query.value.fltDev],
		startTime: query.value.fltStartTime,
		endTime: null,
		fallFeedback: query.value.fltRes,
		sortOrder: 'DESC'
	})
	if(result.code == 1) {
		let res = result.data;
		// 转换时间格式
		alarms.value = res.map(alarm => {
			return {
				alarmCode: alarm.alarmCode,
				fallLocation: alarm.fallLocation,
				fallTime: getTimeDiff(alarm.fallTime),
				fallFeedback: alarm.fallFeedback == '0' ? '未处理' : 
								alarm.fallFeedback == '1' ? '已处理' : 
								alarm.fallFeedback == '2' ? '误报' :
								alarm.fallFeedback == '3' ? '漏报' : '未知',
				feedbackColor: alarm.fallFeedback == '0' ? '#dd524d' : 
								alarm.fallFeedback == '1' ? '#28C76F' : '#f0ad4e'
			}
		}) 
	}
}

// 筛选时间
function onTimeFilter(){
	isTimeFilter.value = !isTimeFilter.value
	if(isLocationFilter.value) isLocationFilter.value = !isLocationFilter.value
	if(isResultFilter.value) isResultFilter.value = !isResultFilter.value
}

// 筛选地点
function onLocationFilter(){
	isLocationFilter.value = !isLocationFilter.value
	if(isTimeFilter.value) isTimeFilter.value = !isTimeFilter.value
	if(isResultFilter.value) isResultFilter.value = !isResultFilter.value
}

// 筛选结果
function onResultFilter(){
	isResultFilter.value = !isResultFilter.value
	if(isLocationFilter.value) isLocationFilter.value = !isLocationFilter.value
	if(isTimeFilter.value) isTimeFilter.value = !isTimeFilter.value
}

// 漏报反馈
function onOmissionAlarm() {
	isTimeFilter.value = false;
	isLocationFilter.value = false;
	isResultFilter.value = false;
	uni.navigateTo({
		url:'/pages/omission-alarm/omission-alarm'
	})
}

// 切换时间
function onTimeChanged(e){
	timeCode.value = e.detail.value;
	query.value.fltEndTime = getTimeNow();
	switch(timeCode.value){
		case '1': query.value.fltStartTime = getDayStart(); break;
		case '2': query.value.fltStartTime = getWeekStart(); break;
		case '3': query.value.fltStartTime = getMonthStart(); break;
		case '4': query.value.fltStartTime = getYearStart(); break;
		default:  query.value.fltStartTime = null; break;
	}
	loadAlarms()
}
	
// 切换地点/设备
function onLocationChanged(e){
	deviceCode.value = e.detail.value;
	if(deviceCode.value=='0') query.value.fltDev = devices.value.map(device=>device.deviceCode)
	else query.value.fltDev = deviceCode.value;
	
	console.log(query.value.fltDev);
	console.log(deviceCode.value);
	
	loadAlarms()
}

// 切换结果
function onResultChanged(e){
	resultCode.value = e.detail.value;
	if(resultCode.value=='4'){
		query.value.fltRes = null;
	}else{
		query.value.fltRes = resultCode.value;
	}
	loadAlarms()
}
	
onShow(async () => {
	// 获取可用设备列表
	devices.value = await loadDevices();
	// 更新查询条件
	query.value.fltDev = devices.value.map(device=>device.deviceCode)
	// 查询报警
	loadAlarms();	
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
			width: 100%;
			height: 100rpx;
			padding: 0 20rpx 0 20rpx;
			.text{
				width: 500rpx;
				height: 60rpx;
				line-height: 60rpx;
				color: $ssc-color-title;
				font-size: $ssc-font-size-title;
			}
			.options{
				display: flex;
				justify-content: center;
				align-items: center;
				.option{
					width: 56rpx;
					height: 56rpx;
					margin: 2rpx;
				}
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
		.location{
			position: absolute;
			top: 100rpx;
			right: 80rpx;
		}
		.result{
			position: absolute;
			top: 100rpx;
			right: 140rpx;
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
