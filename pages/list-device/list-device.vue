<template>
	<view class="list">
		<ssc-item-device v-for="item in 20"/>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.list{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 5rpx;
		padding: 20rpx;
	}
</style>
