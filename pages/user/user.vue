<template>
	<view class="userLayout">
		<ssc-profile :nickname='user.userName' :uid="user.userCode"/>
		
		<view class="selection">
			<ssc-option @on-navigate="onProfile" url='/static/image/setting/profile.png' text='个人资料'/>
			<view class="border"/>
			<ssc-option @on-navigate="onPwd" url='/static/image/setting/pwd.png' text='修改密码'/>
		</view>	
		
		<view class="selection">
			<ssc-option url='/static/image/setting/device.png' text='设备管理'/>
			<view class="border"/>
			<ssc-option url='/static/image/setting/contact.png' text='联系人管理'/>
			<view class="border"/>
			<ssc-option url='/static/image/setting/activity.png' text='活动历史' class="last"/>
			<view class="border"/>
			<ssc-option url='/static/image/setting/alarm.png' text='报警历史' class="last"/>
			<view class="border"/>
			<ssc-option url='/static/image/setting/alarm_mode.png' text='报警方式' class="last"/>
		</view>	
		
		<view class="selection">
			<ssc-option url='/static/image/setting/update.png' text='检查更新'/>
			<view class="border"/>
			<ssc-option url='/static/image/setting/privacy.png' text='隐私政策' class="last"/>
		</view>	

	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getUserInfoAPI } from './api.js';	
import { onShow } from '@dcloudio/uni-app'

let user = ref({});	

async function getUserInfo(){
	try {
		// 从本地缓存中获取用户信息
		user.value = uni.getStorageSync('userInfo');
		
		if (!user.value.userCode) {
			// 从服务器获取用户信息
			let result = await getUserInfoAPI({
				account: user.value.account
			});
			if (result.code == 1) {
				user.value = result.data;
				// 保存到本地缓存
				uni.setStorageSync('userInfo', {
					avatar: user.value.avatar,
					userCode: user.value.userCode,
					account: user.value.account,
					password: user.value.password,
					userName: user.value.userName,
					userDescription: user.value.userDescription
				});
			}
		}
	} catch (error) {
		console.error('获取用户信息失败:', error);
	}
}

onShow(() => {
	getUserInfo()
})
	
function onProfile(){
	uni.navigateTo({
		url: '/pages/profile/profile',
	})
}
	
function onPwd(){
	uni.navigateTo({
		url: '/pages/pwd-update/pwd-update'
	})
}

</script>

<style lang="scss">
	.userLayout{
		margin-top: 100rpx;
		.selection{
			width: 700rpx;
			margin: 50rpx auto;
			boder: 1px solid #eeeeee;
			border-radius: 10rpx;
			box-shadow:0 0 30rpx rgba(0, 0, 0, 0.05);
			.border{
				width: 100%;
				height: 1px;
				border-bottom: 1px solid #eeeeee;
			}
		}
	}
</style>