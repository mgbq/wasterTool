<template>
	<view>
		<view class="cu-bar bg-darkGray search" style="margin: 20px;">
			<view class="search-form  round">
				<text class="cuIcon-search text-green"></text>
				<input @confirm="seachList()" confirmType="search" v-model="searchText" :focus="true"
					placeholder="输入垃圾名称" type="text"></input>
			</view>
		</view>

		<view class="filter-view" v-for="(item,index) in searchResult">
			<view class="item-view item-o bg-white" v-if="index%2==0">
				<text>{{item.garbageName}}</text>
				<text>[{{item.categroyName}}]</text>
			</view>

			<view class="item-view item-ji bg-grey" v-else>
				<text>{{item.garbageName}}</text>
				<text>[{{item.categroyName}}]</text>
			</view>
		</view>

	</view>
</template>

<script>
	const searchGarbage = require('@/nxTemp/utils/garbage-search.js');
	export default {
		data() {
			return {
				searchText: '',
				searchResult: []
			};
		},
		onLoad(parms) {
			let that = this;
			if(this.$Route.query.name){
				this.searchText = this.$Route.query.name
				this.seachList();
			}

		},
		onUnload() {

		},
		methods: {
			seachList() {
				let that = this;
				searchGarbage.search(that.searchText, function success(res) {
					console.log('searchResult:' + res);
					that.searchResult = res;
				});

			}

		}
	}
</script>

<style lang="scss" scoped>
	.bg-darkGray {
		background-color: #f6f6f6;
		color: #ffffff;
	}

	.cu-bar .search-form {
		background-color: #ffffff;
	}

	.filter-view {
		display: flex;
		flex-direction: column;
	}

	.item-view {
		display: flex;
		flex-direction: row;
		padding: 20rpx 50rpx;
		height: 90rpx;
		align-items: center;
	}

	.img {
		height: 50rpx;
		width: 50rpx;
		margin-right: 30rpx;
	}

	.item-ji {
		background-color: #f6f6f6;
		color: black;
	}

	.cu-dialog {
		width: 300rpx;
	}

	.bg-img {
		width: 300rpx;
		height: 300rpx;
	}
</style>
