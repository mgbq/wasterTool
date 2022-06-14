<template>
	<view>
		<view class="startkaoshi" v-if="status=='noLogin'">
			<view @click="mpWxGetUserInfo" class="kaishi">
				<text>开始考试</text>
			</view>

		</view>


		<view class="shijuan" v-else-if="status=='Login'">
			<view class="jindu">
				<text class="title">题目{{currentIndex+1}}</text>
				<text class="count">{{currentIndex+1}} / 10</text>
			</view>
			<view class="timutitle">{{shijuandata[currentIndex]['subject']}}</view>
			<view class="des">属于以下哪种分类？</view>
			<view class="daan">
				<button @click="dati('A')" class="grace-button" hover="true" hoverClass="btnhover"
					type="primary">可回收物</button>
				<button @click="dati('B')" class="grace-button grace-bg-red" hover="true" hoverClass="btnhover"
					type="primary">有害垃圾</button>
				<button @click="dati('C')" class="grace-button grace-bg-green" hover="true" hoverClass="btnhover"
					type="primary">厨余垃圾</button>
				<button @click="dati('D')" class="grace-button grace-bg-black" hover="true" hoverClass="btnhover"
					type="primary">其他垃圾</button>
			</view>
			<view class="jieguo" v-if="isShowjiexi">
				<view class="jiexi" style="margin-top: 30rpx;;">
					<view class="timu">{{shijuandata[currentIndex]['subject']}}</view>
					<view class="daan">
						<viw>
							<text class="no">{{selectAnswer}}</text>
							<text>{{ shijuandata[currentIndex]['answer']}}</text>
						</viw>
					</view>
				</view>
				<button @click="next" style="width: 100%;margin-top: 20px;float: left;"
					class="grace-button grace-gtbg-green" type="primary">下一题</button>
			</view>
		</view>

		<view class="jieguo" v-else>
			<view class="info">
				<view class="fen">获得<text class="num">{{jieguo.fraction}}</text>分</view>


				<view class="jiangbei">
					<image mode="widthFix" src="/static/images/jb.png" style="width: 300rpx;"></image>
				</view>
			</view>
			<view class="grace-margin-top grace-margin-bottom timuxixi">
				<text class="box">共计<text class="num">10</text>题</text>
				<text class="box">答对：<text class="num">{{jieguo.rightNum}}</text>题</text>
				<text class="box">答错：<text class="num">{{jieguo.noRightNum}}</text>题</text>
			</view>

			<button @click="reset" class="grace-button grace-border" style="background-color: #FAAD14;margin-top: 20px;
    float: left;
    width: 100%;" type="primary">再测一次</button>

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
	import loginMpWx from '@/nxTemp/mixin/login-mp-wx.js'
	export default {
		mixins: [loginMpWx],
		components: {},
		data() {
			return {
				jieguo: {
					fraction: 0, //分数
					noRightNum: 0,
					rightNum: 0
				},
				status: "noLogin", // 'noLogin' 'Login','Result'
				shijuandata: [
					// {
					// 	"subject": "AAAA？",
					// 	"answer": "A",
					// }, {
					// 	"subject": "BBB？",
					// 	"answer": "B",
					// },
					// {
					// 	"subject": "CCC？",
					// 	"answer": "C",
					// },
					// {
					// 	"subject": "DDD？",
					// 	"answer": "D",
					// },
					// {
					// 	"subject": "AAAA？",
					// 	"answer": "A",
					// }, {
					// 	"subject": "BBB？",
					// 	"answer": "B",
					// },
					// {
					// 	"subject": "CCC？",
					// 	"answer": "C",
					// },
					// {
					// 	"subject": "DDD？",
					// 	"answer": "D",
					// },
					// {
					// 	"subject": "CCC？",
					// 	"answer": "C",
					// },
					// {
					// 	"subject": "DDD？",
					// 	"answer": "D",
					// },
				], // 试卷集合
				currentIndex: 0, // 当前选中题目
				isShowjiexi: false, // 是否显示解析
				selectAnswer: '', // 你选中的答案
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			// ...mapState(['userInfo'])
		},
		watch: {
			userInfo(newValue, oldValue) {
				console.log('newValue', newValue);
				//加载
				if (newValue) {
					this.isExam();
				}
				console.log('newValue', newValue);
			}
		},
		async onShow() {
			console.log('userInfo', this.userInfo);
			if (this.userInfo.openid) {
				let openid = this.userInfo.openid;
				const res = await yunRequest('nx-user', 'getUserInfo', {
					openid
				}, {
					showLoading: true
				})
				if (res.userInfo) {
					this.$store.dispatch('setUserData', res.userInfo);
				}

			}
		},
		onLoad() {
			//加载
			this.isExam();
		},
		methods: {
			isExam() {
				this.status = this.$tools.isLogin() ? 'Login' : 'noLogin';
				if (this.$tools.isLogin()) {
					this.getNew();
				}
			},
			async getNew() {
				let {
					openid
				} = this.userInfo;
				// 判断是否可以考试不可以考试 status = 'Result'
				const res = await yunRequest('examLog', 'getNew', {
					openid,
				}, {
					showLoading: true
				})
				console.log('res', res)
				if (res.result) {
					let dataDay = res.result.examTime.substring(0, 10);
					let newDay = this.datastime('yous').substring(0, 10)
					console.log('dataDay', dataDay);
					if (dataDay == newDay) {
						// 今天考过了
						this.status = 'Result'
						this.jieguo = res.result;
						return
					}

				}
				this.getTestQuestion();

			},
			async getTestQuestion() {
				const res = await yunRequest('getTestQuestion', 'getList', {}, {
					showLoading: true
				})
				if (res.result.length) {
					this.shijuandata = res.result;
				}

			},
			reset() {
				//加载
				wx.showToast({
					title: '请明天再来',
					icon: "none"
				})
			},
			dati(answer) {
				if (this.isShowjiexi) {
					return
				}
				console.log('shijuandata', this.shijuandata);
				this.selectAnswer = answer;
				let currentAnswer = this.shijuandata[this.currentIndex].answer;
				if (currentAnswer == answer) { // 作对了
					this.jieguo.fraction += 10;
					++this.jieguo.rightNum;
					this.next();
				} else {
					++this.jieguo.noRightNum;
					this.isShowjiexi = true;
				}
			},
			// 下一题
			next() {
				this.isShowjiexi = false;
				++this.currentIndex;
				if (this.currentIndex == 10) {
					//显示考试结果且存数据库
					this.showResult();
				}

			},
			async showResult() {
				this.status = 'Result';
				let {
					openid
				} = this.userInfo;
				let examTime = this.datastime('yous');
				const res = await yunRequest('examLog', 'add', {
					openid,
					examTime,
					fraction: this.jieguo.fraction,
					rightNum: this.jieguo.rightNum,
					noRightNum: this.jieguo.noRightNum
				}, {
					showLoading: true
				})

				const sumRes = await yunRequest('nx-user', 'updateUserInfo', {
					id: this.userInfo._id,
					sum: this.userInfo.sum + this.jieguo.fraction, // 总分数
					examNum: ++this.userInfo.examNum, // 考试次数
				}, {
					showLoading: true
				})


			},
			datastime(type) {
				let myDate = new Date(); //获取当前时间
				let yinian = myDate.getFullYear(); //年
				let yer = parseInt(myDate.getMonth()) + 1; //月份
				if (yer <= 9) {
					yer = "0" + yer;
				}
				let riqi = myDate.getDate(); //日
				if (riqi <= 9) {
					riqi = "0" + riqi;
				}
				let time = myDate.getHours(); //获取当前小时数(0-23)
				if (time <= 9) {
					time = "0" + time;
				}
				let fen = myDate.getMinutes(); //获取当前分钟数(0-59)
				if (fen <= 9) {
					fen = "0" + fen;
				}
				let miao = myDate.getSeconds(); //获取秒钟数
				if (miao <= 9) {
					miao = "0" + miao;
				}
				if (type == 'nyr') {
					return yinian + "年" + yer + "月" + riqi + "日"
				} // 2021年1月14日
				if (type == 'yous') {
					return yinian + "-" + yer + "-" + riqi + " " + time + ":" + fen + ":" + miao //2021-01-14 16:47:36
				}
				if (type == 'int') {
					return parseInt(yinian + "" + yer + "" + riqi + time + "" + fen)
				} //202101141647
				return yinian + "年" + yer + "月" + riqi + "日" + " " + time + ":" + fen + ":" + miao //2021年1月14日 16:47:36
			},
		}
	}
</script>

<style lang="scss" scoped>
	.grace-gtbg-green {
		background: linear-gradient(to right, #39B55A, #8DC63E) !important;
		color: #FFFFFF !important;
	}

	.grace-bg-red {
		background: #FF0036 !important;
		color: #FFFFFF !important;
	}

	.grace-bg-green {
		background: #9DD26D !important;
		color: #FFFFFF !important;
	}

	.grace-bg-black {
		background: #000000 !important;
		color: #FFFFFF !important;
	}

	page {
		background-color: #FFFFFF;
	}

	.startkaoshi {
		width: 100%;
		height: 100%;
		text-align: center;
		padding-top: 250rpx;
		background-color: rgba(0, 0, 0, 0);
		color: #FFFFFF;

		.kaishi {
			width: 300rpx;
			height: 300rpx;
			line-height: 300rpx;
			border-radius: 50%;
			background-color: #39B54A;
			margin: 20rpx auto;
			color: #FFF;
			text-align: center;
			font-size: 48rpx;
		}

		&::after {
			border: none;
		}

	}


	.shijuan {
		text-align: center;
		width: 700rpx;
		height: 100%;
		z-index: 2;
		padding: 20rpx;
	}

	.shijuan .jindu {
		height: 48rpx;
		line-height: 48rpx;
		margin: 25rpx 0;
	}

	.shijuan .jindu .title,
	.shijuan .jindu .count {
		display: block;
		font-size: 32rpx;
	}

	.shijuan .jindu .title {
		float: left;
	}

	.shijuan .jindu .count {
		float: right;
	}

	.shijuan .timutitle {
		font-size: 46rpx;
		margin: 25rpx 0;
		font-weight: 600;
	}

	.shijuan .des {
		font-size: 30rpx;
	}

	.shijuan .daan .grace-button {
		margin: 50rpx 0;
		font-size: 36rpx;
	}

	.jieguo {
		width: 96%;
		height: 100%;
		z-index: 1;
		margin: 0 2%;
		padding-top: 20%;
	}

	.jieguo .info {
		text-align: center;
	}

	.jieguo .info .h2 {
		font-size: 32rpx;
		height: 48rpx;
		line-height: 48rpx;
		margin: 25rpx 0;
		font-weight: 600;
	}

	.jieguo .info .fen {
		font-size: 48rpx;
		margin: 25rpx;
		font-weight: 600;
	}

	.jieguo .info .fen .num {
		font-size: 80rpx;
		color: #F37B1D;
		padding: 20rpx;
	}

	.jieguo .info .chaoguo {
		margin: 25rpx 0;
		color: #AAAAAA;
	}

	.jieguo .info .jiangbei {
		margin: 25rpx 0;
	}

	.jieguo .showda {}

	.jieguo .showda .grace-button {
		width: 45%;
		float: left;
		margin-top: 25rpx;
	}

	.jieguo .timuxixi {
		width: 100%;
		clear: both;
		color: #8C9DA6;
	}

	.jieguo .timuxixi .box {
		width: 33.33%;
		text-align: center;
		display: inline-block;
		float: left;
	}

	.jieguo .timuxixi .box .num {
		font-size: 38rpx;
		color: #E54D42;
		padding: 15rpx;
		font-weight: 600;
	}

	.jieguo .jiexi {
		margin: 25rpx 0;
		color: #898989;
	}

	.jiexi .timu {
		float: left;
		width: 50%;
		color: #666666;
		font-size: 14px;
		font-weight: 600;
		text-align: left;
	}

	.jiexi .daan {
		float: right;
		width: 50%;
		text-align: right;
		font-size: 12px;
	}

	.jiexi .daan text {
		padding: 0 10rpx;
		font-size: 14px;
	}

	.yes {
		color: #39B54A;
	}

	.no {
		color: #E54D42;
		text-decoration: line-through;
	}

	.btnhover {
		background-color: #10a1ed;
		border-radius: 10rpx;
	}

	.content1 {
		padding: 25rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 60rpx;
		background-color: #F8F8F8;
	}
</style>
