<template>
	<view>
		<scroll-view scrollY class="grace-list " style="padding: 20rpx;">
			<view class="grace-list">
				<view bindtap="show" class="grace-list-items" v-for="(item,index) in results" :key="index">
					<view class="grace-list-body grace-border-b">
						<view class="grace-list-title">
							<text class="grace-list-title-text">考试时间：{{item.examTime}}</text>
						</view>
						<view class="grace-list-body-desc">
							<view>
								<text class="dc-icon dc-icon-fenshu"></text>分数：{{item.fraction}}
							</view>
							<view>
								<text class="dc-icon dc-icon-dui"></text>对：{{item.rightNum}}
							</view>
							<view>
								<text class="dc-icon dc-icon-cuo"></text>错：{{item.noRightNum}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

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
				let {
					openid
				} = this.userInfo;
				const res = await yunRequest('examLog', 'getList', {
					openid,
				}, {
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
		background-color: #fff;
	}
</style>

<style lang="less" scoped>
	.grace-border-b {
		border-bottom: 1px solid #E9E9E9;
	}

	.grace-list-items {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.grace-list-icon {
		display: block;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 50rpx;
		flex-shrink: 0;
	}

	.grace-list-image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
		font-size: 0;
		flex-shrink: 0;
	}

	.grace-list-body {
		padding: 26rpx 0;
		margin-left: 26rpx;
		width: 100rpx;
		flex: auto;
	}

	.grace-list-title {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.grace-list-title-text {
		display: block;
		font-size: 26rpx !important;
		color: #333333;
		line-height: 40rpx;
	}

	.grace-list-title-desc {
		display: block;
		font-size: 22rpx;
		color: #999999;
		line-height: 32rpx;
		margin-left: 20rpx;
		flex-shrink: 0;
	}

	.grace-list-body-desc {
		font-size: 22rpx;
		color: #999999;
		line-height: 36rpx;
	}

	.grace-list-arrow-right {
		display: block;
		font-size: 36rpx !important;
		height: 50rpx !important;
		line-height: 50rpx !important;
		text-align: right;
		width: 60rpx;
		color: #B2B2B2;
		flex-shrink: 0;
	}

	.dc-icon {
		font-size: 32rpx;
	}

	.grace-list-items {
		background-color: #f9f9f9 !important;
		padding: 0 25rpx;
	}

	.grace-list-body-desc {
		margin-top: 20rpx;
	}

	.grace-list-body-desc view {
		float: left;
		width: 33.3%;
		height: 42rpx;
		line-height: 42rpx;
	}

	.grace-list-body-desc text {
		font-size: 30rpx;
		height: 42rpx;
		line-height: 42rpx;
	}

	.grace-list-title-text {
		width: 100%;
		font-size: 28rpx !important;
		height: 48rpx;
		line-height: 48rpx;
		margin-bottom: 5rpx;
	}

	.grace-list-body {
		margin-left: 0;
	}
</style>
