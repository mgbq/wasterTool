<template>
	<view>
		<view class="banner">
			<swiper class="screen-swiper" :class="'square-dot'" :indicator-dots="true" :circular="true" :autoplay="true"
				interval="5000" duration="500">
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-bar bg-darkGray">
			<view class=" search-form  round ">
				<text class="cuIcon-search text-green"></text>
				<input @focus="gotoSeach()" type="text" placeholder="输入垃圾名称"></input>
			</view>
		</view>

		<view style="text-align: center; color: #00cc77;margin: 40px 0;font-weight: bold;font-size: 18px;">或</view>

		<view class='ai-view' @click="onGetImgClick">
			<image src='/static/images/paizhao.png' class='ai-paizhao'></image>
			<text class='txt'>拍照识别</text>
		</view>

		<view :class="[isShow?'show':'','cu-modal']" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="radioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in results" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.keyword}}</view>
								<radio class="round" :value="item.keyword"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>
<script>
	import config from "@/nxTemp/config/index.config.js";
	export default {
		data() {
			return {
				imgList: [
					'/static/images/type1.jpg',
					'/static/images/type2.jpg',
				],
				token: '',
				results: [],
				isShow: false
			};
		},
		onShow() {
			this.getToken();
		},
		onLoad(parms) {
			let that = this;

		},
		onUnload() {

		},
		methods: {
			hideModal() {
				this.isShow = false
			},
			radioChange(e) {
				let radioValue = e.detail.value;
				this.$Router.push({
					path: '/pages/public/search',
					query: {
						name: radioValue
					}
				});

			},
			getToken() {
				uniCloud.callFunction({
						name: 'getBaiduToken',
						data: {
							apiKey:`${config.apiKey}`,
							secretKey:`${config.secretKey}`
						}
					})
					.then(res => {
						//存token
						if (res.result.data.access_token) {
							this.token = res.result.data.access_token;
							console.log('token', this.token);
						}
					});
			},
			onGetImgClick() {
				const that = this
				uni.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						console.log('res.tempFilePaths', res.tempFilePaths)
						wx.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0],
							encoding: "base64",
							success: childRes => {
								console.log('res.data', childRes.data);
								let url = encodeURIComponent(childRes.data)
								that.scanImg(childRes.data)
							},
							fail: err => {
								console.log('err', err);
								wx.showToast({
									title: '拍照失败,未获取相机权限或其他原因',
									icon: "none"
								})
							}
						})
					}
				})
			},
			scanImg(base64) {
				wx.showLoading({
					title: '加载数据中....',
				})
				uniCloud.callFunction({
						name: 'imgScan',
						data: {
							token: this.token,
							image: base64
						}
					})
					.then(res => {
						console.log('res', res)
						let results = res.result.data.result;
						wx.hideLoading()
						if (results.length) {
							this.isShow = true;
							this.results = results;
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

<style lang="less" scoped>
	.banner {}

	.bg-darkGray {
		background-color: #f6f6f6;
		color: #ffffff;
	}

	.cu-bar .search-form {
		height: 90rpx;
		background-color: #ffffff;
		// display: flex;
		// flex-direction: row;
		// width: calc(100% - 60rpx);
	}

	.cu-bar .search-form input {
		height: 100rpx;
	}

	.cu-bar {
		padding-top: 40px;
	}

	.ai-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.txt {
		font-size: 24rpx;
		/*font-weight: bold;*/
		color: #00cc77;
		margin-top: 10rpx;
	}

	.ai-paizhao {
		width: 150rpx;
		height: 150rpx;
	}
</style>
