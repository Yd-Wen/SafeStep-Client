<template>
	<view class="ssc-title">
		<view class="name">
			<slot name="name"></slot>
		</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.ssc-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	.name{
		font-size: $ssc-font-size-subtitle;
	}
}

</style>