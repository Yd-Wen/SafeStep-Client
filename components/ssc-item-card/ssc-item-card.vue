<template>
	<view class="item-card">
		<navigator :url="url" class="box" v-if="!isMore">
			<image class="pic" :src="img" mode="aspectFill"></image>
			<view class="mask">{{maskText}}</view>
		</navigator>
		<navigator :url="url" class="box more" v-else>
			<image class="pic" :src="img" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">{{maskText}}</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
defineProps({
	url:{
		type: String,
		default: "/pages/list-device/list-device"
	},
	isMore:{
		type: Boolean,
		default: false
	},
	img:{
		type: String,
		default: "../../static/image/avatar/avatar_device_default.png"
	},
	maskText:{
		type: String,
		default: "更多"
	}
})
</script>

<style lang="scss" scoped>
	.item-card{
		.box{
			width: 220rpx;
			height: 300rpx;
			border-radius: 10rpx;
			overflow: hidden; //使子容器图片不覆盖圆角
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.pic{
				width: 100%;
				height: 100%;
			}
			.mask{
				width: 100%;
				height: 70rpx;
				background: rgba(0,0,0,0.2);
				color: #fff;
				position: absolute;
				bottom: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				backdrop-filter: blur(20rpx); //磨砂效果
				font-weight: 600;
			}
		}
		.more{
			.mask{
				width: 100%;
				height: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				flex-direction: column;
			}
			.text{
				font-size: $ssc-font-size-hint;
				line-height: $ssc-font-size-hint;
			}
		}
	}
</style>