import {
	yunRequest
} from '@/nxTemp/yunRequest'
export default {
	methods: {
		mpWxGetUserInfo() {
			wx.getUserProfile({
				desc: '更好的服务',
				success: res => this.onSaveUserInfo(res)
			})
		},
		async onSaveUserInfo(userData) {
			const [loginErr, loginData] = await uni.login({
				provider: 'weixin'
			})
			const res = await yunRequest('nx-user', 'loginByWeixin', {
				code: loginData.code,
				encryptedData: userData.encryptedData,
				iv: userData.iv
			}, {
				showLoading: true
			})
			this.$store.dispatch('setUserData', res.userInfo);

		}
	}
}
