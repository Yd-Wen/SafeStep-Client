<template>
	<view class="userLayout">
		<ssc-profile nickname='张三' uid="102333"/>
		
		<view class="selection">
			<ssc-option url='/static/icon/setting_device.png' text='设备'/>
			<view class="border"/>
			<ssc-option url='/static/icon/setting_device.png' text='设备'/>
			<view class="border"/>
			<ssc-option url='/static/icon/setting_contact.png' text='联系人' class="last"/>
		</view>	
		
		<view class="selection">
			<ssc-option url='/static/icon/setting_device.png' text='设备'/>
			<view class="border"/>
			<ssc-option url='/static/icon/setting_contact.png' text='联系人' class="last"/>
		</view>	

	</view>
</template>

<script setup>
	
</script>

<style lang="scss">
	.userLayout{
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