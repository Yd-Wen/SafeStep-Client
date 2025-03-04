<template>
	<view class="bg">
		<view class="header">
			<image class="img" src="../../static/image/alarm/alarm.png" mode="aspectFit"></image>
		</view>
		<view class="body">
			<view class="card">
				<view class="item">
					<view class="img">
						<image src="../../static/image/alarm/alarm_fall.png" mode="aspectFill"></image>
					</view>
					<view class="text">发现跌倒异常</view>
				</view>
			</view>
			<view class="card info">
				<view class="item">
					<view class="img">
						<image src="../../static/image/alarm/alarm_time.png" mode="aspectFill"></image>
					</view>
					<view class="text">{{alarm.fallTime}}</view>
				</view>
				<view class="item">
					<view class="img">
						<image src="../../static/image/alarm/alarm_location.png" mode="aspectFill"></image>
					</view>
					<view class="text">{{alarm.fallLocation}}</view>
				</view>
				<view class="item">
					<view class="img">
						<image src="../../static/image/alarm/alarm_feedback.png" mode="aspectFill"></image>
					</view>
					<view class="text"  :style="{color:alarm.feedbackColor}">{{alarm.fallFeedback}}</view>
				</view>
			</view>
			<view class="card" v-if="!isOmission">
				<view class="item">
					<view class="img">
						<image src="../../static/image/alarm/alarm_contact.png" mode="aspectFill"></image>
					</view>
					<view class="text">系统已向联系人拨打电话</view>
				</view>
			</view>
			
			<view class="button" v-if="!isFeedBack">
				<view class="btn">
					<ssc-button-primary @click="onFeedback" text="我已处理"/>
				</view>
				<view class="btn">
					<ssc-button-warn @click="onError" text="标记误报"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { updateAlarmAPI } from "./api.js";

const alarm = ref({});
const isFeedBack = ref(false); // 是否已处理
const isOmission = ref(false); // 是否漏报

onLoad(async (option) => {
	// 解析对象
	alarm.value = JSON.parse(option.alarm);
	console.log(alarm.value);
	isFeedBack.value = alarm.value.fallFeedback == '未处理'? false: true;
	isOmission.value = alarm.value.fallFeedback == '漏报'? true: false; 
})

async function onFeedback() {
	let result = await updateAlarmAPI({
		alarmCode: alarm.value.alarmCode,
		fallFeedback: "1"
	})
	if(result.code == 1){
		alarm.value.fallFeedback = '已处理';
		alarm.value.feedbackColor = '#28C76F';
		isFeedBack.value = true;	
	}
}

async function onError() {
	let result = await updateAlarmAPI({
		alarmCode: alarm.value.alarmCode,
		fallFeedback: "2"
	})
	if(result.code == 1){
		alarm.value.fallFeedback = '误报';
		alarm.value.feedbackColor = '#f0ad4e';
		isFeedBack.value = true;	
	}
}	
</script>

<style lang="scss" scoped>
	.bg{
		width: 100%;
		height: 100vh;
		padding: 1rpx 0;
		background-color: $ssc-color-bg;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.header{
			width: 500rpx;
			height: 300rpx;
			margin: 80rpx 0;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.body{
			width: 100%;
			flex: 1;
			padding: 0 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			background-color: $ssc-color-bg;
			.card{
				width: 100%;
				height: 100rpx;
				margin: 10rpx 0;
				border-radius: 30rpx;
				background-color: #fff;
				border-bottom: 1rpx solid $ssc-color-border-grey;
				.item{
					width: 650rpx;
					height: 100rpx;
					margin: 0 auto;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.img{
						width: 60rpx;
						height: 60rpx;
						border-radius: $ssc-border-radius-circle; //圆形
						overflow: hidden; //使子容器图片不覆盖圆角
						image{
							width: 100%;
							height: 100%;
						}
					}
					.text{
						flex: 1;
						margin-left: 30rpx;
						height: $ssc-font-size-subtitle;
						line-height: $ssc-font-size-subtitle;
					}
				}
			}
			.info{
				height: 300rpx;
			}
			.button{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 60rpx;
				.btn{
					width: 320rpx;
					height: 80rpx;
				}
			}
		}
	}
</style>

