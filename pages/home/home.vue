<template>
	<view>
		<ssc-banner/>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app'

let userInfo = ref({})

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

</style>