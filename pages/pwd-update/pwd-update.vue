<template>
	<view class="layout">
		<view class="bg">
			<view class="text">修改密码</view>
			<image src="/static/image/welcome.png" mode="aspectFill"></image>
		</view>
		<view class="form">
			<view class="content">
				<image src="/static/image/passwd.png" mode="aspectFill"/>
				<view class="pwd">
					<input password type="safe-password" placeholder="请输入原密码"/>
				</view>
			</view>
			<view class="content">
				<image src="/static/image/passwd_new.png" mode="aspectFill"/>
				<view class="pwd">
					<input password type="safe-password" placeholder="请输入新密码"/>
				</view>
			</view>
			<view class="content">
				<image src="/static/image/passwd_new.png" mode="aspectFill"/>
				<view class="pwd">
					<input password type="safe-password" placeholder="请确认新密码"/>
				</view>
			</view>
		</view>
		<view class="btn">
			<ssc-button-primary text="提交"/>
		</view>
		<view class="btn">
			<ssc-button-default text="取消"/>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.layout{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.bg{
			width: 750rpx;
			height: 550rpx;
			background-image: linear-gradient(to top right, #fcfef7 0%, #f7fdee 50%, #f0fde5 100% );
			display: flex;
			justify-content: space-between;
			padding: 0 50rpx;
			.text{
				width: 300rpx;
				font-size: $ssc-font-size-title;
				color: $ssc-color-title;
				font-weight: bold;
				position: relative;
				top: 300rpx;
			}
			image{
				width: 480rpx;
				height: 360rpx;
				position: relative;
				top: 150rpx;
			}
		}
		.form{
			position: relative;
			bottom: 50rpx;
			width: 680rpx;
			height: 600rpx;
			background-color: #fff;
			border-radius: 30rpx; //卡片形
			box-shadow: 0 0 10rpx 0 $ssc-color-border-grey;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.content{
				width: 620rpx;
				height: 100rpx;
				margin-bottom: 50rpx;
				padding: 0 10rpx;
				display: flex;
				align-items: center;
				.pwd{
					width: 520rpx;
					border-bottom: 1rpx solid $ssc-color-primary;
					input{
						height: 100rpx;
						padding: 0 20rpx;
					}
				}
				image{
					width: 50rpx;
					height: 50rpx;
					padding-right: 20rpx;
				}
			}
		}
		.btn{
			width: 600rpx;
			margin-bottom: 50rpx;
		}

	}
	
</style>


