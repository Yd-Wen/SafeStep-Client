<template>
	<view class="list" v-for="(item, index) in items" :key="index">
		<view class="item">
			<ssc-item-contact/>
			<view class="separator" v-if="index !== items.length - 1">
				<view class="space"></view>
				<view class="border"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	
const items = ref([]);
// 初始化items数组，这里只是为了演示，实际情况可能需要从后台或其他地方获取数据
for (let i = 0; i < 20; i++) {
	items.value.push({});
}
</script>

<style lang="scss" scoped>
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
</style>
