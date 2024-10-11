<template>
	<view class="userLayout">
		<ssc-profile nickname='未登录用户' uid="UID:100000"/>
		
		<view class="selection">
			<ssc-option url='/static/image/setting/profile.png' text='个人资料'/>
			<view class="border"/>
			<ssc-option url='/static/image/setting/pwd.png' text='修改密码'/>
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