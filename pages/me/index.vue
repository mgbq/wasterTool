<template>
	<view>
		<view class="UCenter-bg">
			<view v-if="userInfo.nickname">
				<image class="png" mode="widthFix" :src="userInfo.avatar"></image>
				<view class="margin-top-sm nick_name">
					<text>{{userInfo.nickname}}</text>
				</view>

			</view>
			<view @click="mpWxGetUserInfo" v-else>
				<image class="png" src="/static/images/users.png"></image>
				<view class="margin-top-sm nick_name">
					<text>请登录</text>
				</view>
			</view>


			<image class="gif-wave" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-bac0ea58-fde2-44b8-9fbd-e07bb8738606/14843b8d-6ccc-45e8-b58b-03534ec660b0.gif"></image>

		</view>

		<view class="grace-body" v-if="userInfo.nickname">
			<view class="grace-grids-items" @click="$Router.push('/pages-me/examLog')">
				<text class="iconfont icon-jilu"></text>
				<text class="grace-grids-text">考试记录</text>
			</view>

			<view class="grace-grids-items " @click="$Router.push('/pages-me/examSort')">
				<text class="iconfont  icon-paihang"></text>
				<text class="grace-grids-text">考试排行</text>
			</view>
		</view>

	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import loginMpWx from '@/nxTemp/mixin/login-mp-wx.js'
	export default {
		mixins: [loginMpWx],
		components: {},
		data() {
			return {

			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		onShow() {
			//加载
			console.log('userInfo', this.userInfo)
		},
		onLoad() {

		},
		onShareAppMessage() {},
		onShareTimeline() {},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.grace-body {
		width: 750rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
	}

	.UCenter-bg {
		background-color: #0da408;
		background-size: cover;
		height: 395rpx;
		display: flex;
		justify-content: center;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg image.png {
		border-radius: 50%;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 9;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	.margin-top-sm {
		text-align: center;
	}

	.grace-grids-items {
		margin: 50rpx 0rpx 0rpx 50rpx;
		display: flex;
		flex-direction: column;
	}

	.grace-grids-items .grace-grids-text {
		font-size: 28rpx;
		line-height: 80rpx;
	}

	.nick_name {
		font-size: 32rpx;
	}
</style>
