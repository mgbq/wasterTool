<template>
	<view>

		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID"
			:style="[{height:'100vh'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">


			<view class="container" :style="{backgroundColor:sortObj.bgcolor}">
				<view class="view-hearder">
					<image class="logo" :src="sortObj.logo"></image>
					<view class="hearder-name-view">
						<text class="one-view">{{sortObj.name}}:</text>
						<text class="two-view">{{sortObj.content}}</text>
					</view>
				</view>
				<view class="title" :style="{backgroundColor:sortObj.color}">主要包括</view>
				<view>{{sortObj.desc}}</view>
				<view class="title" :style="{backgroundColor:sortObj.color}">投放要求</view>
				<block  v-for="(item,index) in sortObj.action"  :key="index">
					<view class="action-go">
						<text class="cuIcon-title text-gan"></text>
						<text>{{item}}</text>
					</view>
				</block>
			</view>

			<block v-for="(item,index) in arrayData" :key="index">
				<view :class="'indexItem-' + item.letter" :id="'indexes-' + item.letter" :data-index="item.letter">
					<view class="padding">{{item.letter}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in item.garbageItem" :key="sub">
							<view class="cu-avatar round lg">{{item.letter}}</view>
							<view class="content">
								<view class="text-grey"><text class="text-abc">{{items}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{height:'100vh'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur"
					@touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	const garbage_data = require('@/nxTemp/utils/garbage-sort/garbage-sort-data.js');
	export default {
		data() {
			return {
				sortObj:{
						color: "#014782",
						bgcolor: "#e9e8e6",
						logo: "/static/images/ljkhs.jpeg",
						name: "可回收物",
						content: "适宜回收利用和资源化利 用的，如：玻、金、塑、 纸、衣",
						desc: "酱油瓶、玻璃杯、平板玻璃、易拉罐、饮料瓶、 洗发水瓶、塑料玩具、书本、报纸、广告单、 纸板箱、衣服、床上用品等",
						action: ["轻投轻放", "清洁干燥，避免污染", "废纸尽量平整", "立体包装物请清空内容物，清洁后压扁投放", "有尖锐边角的，应包裹后投放"],
					},
				sortArray: [{
						color: "#014782",
						bgcolor: "#e9e8e6",
						logo: "/static/images/ljkhs.jpeg",
						name: "可回收物",
						content: "适宜回收利用和资源化利 用的，如：玻、金、塑、 纸、衣",
						desc: "酱油瓶、玻璃杯、平板玻璃、易拉罐、饮料瓶、 洗发水瓶、塑料玩具、书本、报纸、广告单、 纸板箱、衣服、床上用品等",
						action: ["轻投轻放", "清洁干燥，避免污染", "废纸尽量平整", "立体包装物请清空内容物，清洁后压扁投放", "有尖锐边角的，应包裹后投放"],
					},
					{
						color: "#e73322",
						bgcolor: "#c8e2f8",
						logo: "/static/images/ljyh.jpeg",
						name: "有害垃圾",
						content: "对人体健康或者自然环境造成直接或潜在危害的废弃物",
						desc: "废电池、油漆桶、荧光灯管、废药品及其包装物等",
						action: ["投放时请注意轻放", "易破损的请连带包装或包裹后轻放", "如易挥发，请密封后投放"],
					},
					{
						color: "#664035",
						bgcolor: "#d6d5d4",
						logo: "/static/images/ljcy.jpeg",
						name: "厨余垃圾",
						content: "日常生活垃圾产生的容易腐烂的生物质废弃物",
						desc: "剩菜剩饭、瓜皮果核、花卉绿植、过期食品等",
						action: ["纯流质的食物垃圾，如牛奶等，应直接倒进下水口", "有包装物的湿垃圾应将包装物去除后分类投放，包装物请投放到对应的可回收物或干垃圾容器"],
					}, {
						color: "#2c2b27",
						bgcolor: "#e9e8e6",
						logo: "/static/images/ljothers.jpeg",
						name: "其他垃圾",
						content: "除有害垃圾、厨余垃圾、可回收物以外的其他生活废弃物",
						desc: "餐盒、餐巾纸、湿纸巾、卫生间用纸、塑料袋、 食品包装袋、污染严重的纸、烟蒂、纸尿裤、 一次性杯子、大骨头、贝壳、花盆、陶瓷等",
						action: ["尽量沥干水分", "难以辨识类别的生活垃圾投入干垃圾容器内"],

					}
				],
				// StatusBar: this.StatusBar,
				// CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				arrayData: [],
				listCur: '',
			};
		},
		onLoad() {
			console.log('this.$Route.query', this.$Route.query);
			let index = this.$Route.query.index;
			let title = this.$Route.query.name;
			uni.setNavigationBarTitle({
				title
			})
			this.sortObj  = this.sortArray[index];
			this.arrayData = garbage_data.garbage_sort_data[index].data;
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {

				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style>
	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}


	.container {
		margin: 50rpx 5%;
		width: 90%;
		padding: 40rpx 20rpx;
		display: flex;
		flex-direction: column;
		background-color: #e9e8e6;
		border-radius: 20rpx;

	}

	.view-hearder {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.hearder-name-view {
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
	}

	.one-view {
		font-size: 30rpx;
		font-weight: bold;
	}

	.two-view {
		width: 400rpx;
		font-size: 25rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		border-radius: 20rpx;
	}

	.title {
		/* background-color: #2c2b27; */
		color: white;
		height: 80rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 30rpx 0;
	}

	.text-gan {
		color: #2c2b27;
	}

	.action-go {
		width: 100%;
		margin-top: 10rpx;
	}
</style>
