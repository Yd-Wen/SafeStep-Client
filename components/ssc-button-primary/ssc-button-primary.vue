<template>
	<view class="button">
		<button @click="$emit('click')" type="primary">{{text}}</button>
	</view>
</template>

<script setup>
defineProps({
	text:{
		type:String,
		default:'按钮'
	}
})
defineEmits(['click'])
</script>

<style lang="scss" scoped>
	.button{
		button{
			background-color: $ssc-color-primary;
			border-radius: 50rpx;
			font-size: $ssc-font-size-subtitle;
		}
	}
</style>