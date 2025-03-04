<template>
	<view>
		<ssc-banner :items="swiperItems"/>
		
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28C76F"/>
				<text>公告</text>
			</view>
			<view class="notices">
				<swiper autoplay interval="1500" duration="300" vertical circular>
					<swiper-item v-for="(item,index) in 4">
						步步安版权公告
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="monitor">
			<ssc-title class="ssc-title">
				<template #name>监控</template>
				<template #custom>
					<navigator url="/pages/status/status" open-type="switchTab" class="more">详情</navigator>
				</template>
			</ssc-title>
			<view class="content">
				<view class="box">
					<image class="img" src="../../static/image/avatar/avatar_device_default.png" mode="aspectFill"/>
				</view>
				<navigator url="/pages/status/status" open-type="switchTab" class="card">
					<view class="item">
						<view class="text">可用</view>
						<view class="title">设备</view>
					</view>
					<view class="item">
						<view class="text">客厅</view>
						<view class="title">位置</view>
					</view>
					<view class="item">
						<view class="text">无人</view>
						<view class="title">状态</view>
					</view>
				</navigator>
			</view>
		</view>
		
		<view class="statistics">
			<ssc-title class="ssc-title">
				<template #name>统计</template>
				<template #custom>
					<navigator url="/pages/history-activity/history-activity" open-type="navigate" class="date">
						<uni-icons type="calendar" size="18" color="#28C76F"/>
						<view class="text">{{dateStr}}</view>
					</navigator>
				</template>
			</ssc-title>
			<view class="content">
				<view class="card">
					<view class="text">
						<view class="risk">{{riskCount}}</view>
						<view class="unit">/次</view>
					</view>
					<view class="title">发现风险</view>
				</view>
				<view class="card">
					<view class="text">
						<view class="warn">{{fallCount}}</view>
						<view class="unit">/次</view>
					</view>
					<view class="title">发现跌倒</view>
				</view>
			</view>
		</view>
		
		<view class="contact">
			<ssc-title class="ssc-title">
				<template #name>联系人</template>
			</ssc-title>
			<view class="content">
				<ssc-item-card v-for="(item, index) in 2"></ssc-item-card>
				<ssc-item-card :isMore="true"></ssc-item-card>
			</view>
		</view>

		<view class="device">
			<ssc-title class="ssc-title">
				<template #name>设备</template>
			</ssc-title>
			<view class="content">
				<ssc-item-card v-for="(item, index) in 2"></ssc-item-card>
				<ssc-item-card :isMore="true"></ssc-item-card>
			</view>
		</view>
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { formatDate } from "@/utils/timeUtil.js";

// swiper数据和方法
const swiperItems = ref([
  { imageUrl: '/static/image/banner/banner_device.png', onClick: onDevice },
  { imageUrl: '/static/image/banner/banner_contact.png', onClick: onContact },
  { imageUrl: '/static/image/banner/banner_activity.png', onClick: onActivity }
]);

let userInfo = ref({});
const dateStr = ref(formatDate(Date.now()));
const riskCount = ref(0);
const fallCount = ref(0);

function onDevice(){
	uni.navigateTo({
		url:"/pages/list-device/list-device"
	})
}

function onContact(){
	uni.navigateTo({
		url:"/pages/list-contact/list-contact"
	})
}

function onActivity(){
	uni.navigateTo({
		url:"/pages/history-activity/history-activity"
	})
}

function getData() {
	userInfo = uni.getStorageSync('userInfo')
	console.log(userInfo);
	if(userInfo.account == null) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		})
		// 1s后跳转到登录页面
		setTimeout(() => {
			uni.reLaunch({url: '/pages/login/login'})
		}, 1000)
	}
}

onShow(()=>{
	getData()
})

</script>

<style lang="scss" scoped>

.notice{
	width: 710rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: $ssc-color-text-bg;
	margin: 0 auto;
	border-radius: 40rpx;
	display: flex; 
	.left{
		width: 140rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		text{
			line-height: 30rpx;
			margin-left: 5rpx;
			color: $ssc-color-primary;
			font-size: 30rpx;
			font-weight: 500; //粗体
		}
	}
	.notices{
		flex: 1;
		swiper{
			height: 100%; //继承父级，取消本身高度
			&-item{
				height: 100%;
				color: $ssc-color-paragraph;
				font-size: 30rpx;
				overflow: hidden; //隐藏父级
				white-space: nowrap; //不换行
				text-overflow: ellipsis; //省略号
			}
		}
	}
}

.monitor{
	width: 710rpx;
	height: 500rpx;
	margin: 30rpx auto;
	display: flex;
	flex-direction: column;
	.ssc-title{
		flex: 1;
		.more{
			font-size: $ssc-font-size-hint;
			color: $ssc-color-primary;
		}
	}
	.content{
		width: 100%;
		height: 450rpx;
		padding: 10rpx 0;
		display: flex;
		flex-direction: column;
		.box{
			width: 310rpx;
			height: 250rpx;
			margin: 0 auto;
			border-radius: 30rpx;
			overflow: hidden;
			.img{
				width: 100%;
				height: 100%;
			};
		}
		.card{
			width: 690rpx;
			flex: 1;
			margin: 10rpx auto;
			border-radius: 30rpx;
			box-shadow:0 0 50rpx rgba(0, 0, 0, 0.1);
			display: flex;
			.item{
				width: 200rpx;
				height: 100%;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
				.text{
					font-size: $ssc-font-size-paragraph;
				}
				.title{
				
					font-size: $ssc-font-size-hint;
					color: $ssc-color-hint;
				}
			}
		
		}
	}
}

.statistics{
	width: 710rpx;
	height: 250rpx;
	margin: 30rpx auto;
	.ssc-title{
		flex: 1;
		.date{
			display: flex;
			color: $ssc-color-primary;
			.text{
				margin-left: 5rpx;
				font-size: $ssc-font-size-hint;
			}
		}
	}
	.content{
		width: 100%;
		height: 200rpx;
		padding: 10rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.card{
			width: 320rpx;
			height: 100%;
			margin: 10rpx;
			border-radius: 30rpx;
			box-shadow:0 0 50rpx rgba(0, 0, 0, 0.1);
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			.text{
				display: flex;
				justify-content: center;
				align-items: flex-end;
				.unit{
					font-size: $ssc-font-size-hint;
					color: $ssc-color-subtitle;
					margin-left: 5rpx;
				}
				.risk{
					font-size: $ssc-font-size-title;
					color: $ssc-color-risk;
					line-height: $ssc-font-size-title;
				}
				.warn{
					font-size: $ssc-font-size-title;
					color: $ssc-color-warn;
					line-height: $ssc-font-size-title;
				}
			}
			.title{
				font-size: $ssc-font-size-hint;
				color: $ssc-color-hint;
			}
		}
	}
	
}

.contact{
	width: 710rpx;
	height: 380rpx;
	margin: 30rpx auto;
	.ssc-title{
		flex: 1;
	}
	.content{
		width: 100%;
		height: 320rpx;
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

.device{
	width: 710rpx;
	height: 380rpx;
	margin: 30rpx auto;
	.ssc-title{
		flex: 1;
	}
	.content{
		width: 100%;
		height: 320rpx;
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

</style>