<template>
	<view>
		<view class="ranking-lists">
			<view class="ranking-lists-item grace-nowrap grace-flex-vcenter" v-for="(item,index) in results"
				:key="index">
				<view class="ranking-lists-num"  :style="{color:(index==0?'#FF0036':'#666666')}" >{{index+1}}</view>
				<image class="ranking-lists-image" :src="item.avatar"></image>
				<view class="ranking-lists-content">
					<text class="ranking-lists-content-name">{{item.nickname}}</text>
					<text class="ranking-lists-content-desc">总分：{{item.sum}}</text>
					<text class="ranking-lists-content-desc">均分：{{item.sum/item.examNum}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		yunRequest
	} from '@/nxTemp/yunRequest'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				results: [],
			};
		},
		onShow() {
			this.getList();
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			async getList() {
				const res = await yunRequest('nx-user', 'getList', {}, {
					showLoading: true
				})
				console.log('res', res)
				if (res.result.length) {
					this.results = res.result;
				}

			}

		},
	}
</script>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>

<style lang="less" scoped>
	.grace-nowrap {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.grace-flex-vcenter {
		align-items: center;
	}

	.ranking-lists {
		background-color: #FFFFFF;
		margin: 25rpx;
		border-radius: 16rpx;
		padding: 25rpx;
	}

	.ranking-lists-item {
		padding: 20rpx;
	}

	.ranking-lists-num {
		width: 60rpx;
		line-height: 80rpx;
		font-size: 50rpx;
		color: #666666;
		font-weight: bold;
		font-style: italic;
		flex-shrink: 0;
	}

	.ranking-lists-image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		margin: 0 20rpx;
		flex-shrink: 0;
		border: 6rpx solid #E5E5E5;
	}

	.ranking-lists-content {
		width: 600rpx;
		margin: 0 10rpx;
	}

	.ranking-lists-content-name {
		font-size: 30rpx;
		line-height: 56rpx;
		color: #333333;
		width: 100%;
		display: block;
		line-height: 50rpx;
	}

	.ranking-lists-content-desc {
		color: #999999;
		font-size: 24rpx;
		line-height: 36rpx;
		width: 100%;
		display: block;
	}
</style>
