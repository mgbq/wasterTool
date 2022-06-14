<template>
	<view>
		<view class='top-view'>
			<text>垃圾分类，我们一起来！</text>
		</view>

		<view class="cu-bar bg-darkGray">
			<view class=" search-form  round ">
				<text class="cuIcon-search text-green"></text>
				<input @focus="gotoSeach()" type="text" placeholder="输入垃圾名称"></input>
			</view>
		</view>

		<view class="grid col-2 padding-sm">
			<view class="padding-sm " @click="gotoType(item)" v-for="item in ColorList">
				<image class="icon" :src="item.pic"></image>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				ColorList: [{
						pic: "/static/images/ljkhs.jpeg",
						name: '可回收物',
						index: 0
					}, {
						pic: "/static/images/ljyh.jpeg",
						name: '有害垃圾',
						index: 1
					},
					{
						pic: "/static/images/ljcy.jpeg",
						name: '厨余垃圾',
						index: 2
					},
					{
						pic: "/static/images/ljothers.jpeg",
						name: '其他垃圾',
						index: 3
					}
				]
			};
		},
		onShow() {
			//加载
		},
		onLoad() {

		},
		methods: {
			gotoType(item) {
				this.$Router.push({
					path: '/pages-type/indexes',
					query:{
						name:item.name,
						index:item.index
					}
				});
			},
			gotoSeach() {
				console.log('gotoSeach');
				this.$Router.push({
					path: '/pages/public/search',
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.icon {
		width: 220rpx;
		height: 220rpx;
		margin: 20rpx 40rpx;
		border-radius: 20rpx;
	}

	.padding-sm {
		width: 100%;
	}

	.top-view {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 70rpx;
	}

	.bg-darkGray {
		background-color: #f6f6f6;
		color: #ffffff;
	}

	.cu-bar .search-form {
		height: 90rpx;
		background-color: #ffffff;
		
	}

	.cu-bar {
		margin-top: 20rpx;
	}
</style>
