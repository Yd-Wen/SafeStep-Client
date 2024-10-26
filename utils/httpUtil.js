const baseUrl = "http://localhost:8080"
//const baseUrl = "http://10.152.222.136:8080"

export function http(options, loading = true) {
	console.log('%c请求拦截：', ' background:orange', options);
	if (loading) {
		uni.showLoading({
			title: "加载中...",
			mask: true
		});
	};

	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				token:uni.getStorageSync("userToken")||''
			},
			url: baseUrl + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			async success(res) {
				uni.hideLoading();
				resolve(res.data);
				console.log('响应拦截：', options, res.data);
				if(res.data.code == 900){
					uni.removeStorageSync("token");
					uni.showModal({
						title:'登录过期提示',
						content:'登录已过期，请重新登录',
						showCancel:false,
						success:()=>{
							uni.reLaunch({
								url:"/pages/login/login",
							})
						}
					})
				}else{
					uni.showToast({
						title: res.data.msg,
						icon: res.data.code == 1?"success":"error"
					})
				}
			},
			fail(err) {
				uni.hideLoading();
				console.log('请求失败：', err);
				uni.showToast({
					icon: "error",
					title: err.data.msg
				})
				reject(err);
			},
			complete() {
				// uni.hideLoading();    // 在showToast之前执行会受影响
			}
		});
	});
};

export function uploadFile(options, loading = true) {
	console.log('%c请求拦截：', ' background:orange', options);
	if (loading) {
		uni.showLoading({
			title: "加载中...",
			mask: true
		});
	};
	return new Promise((resolve, reject) => {
		let header = {
			token:uni.getStorageSync("userToken")||''
		}
		uni.uploadFile({
			url: baseUrl+options.url,
			filePath: options.filePath,
			name: 'file',
			header: header, // 设置请求的 header
			formData: options.formData, // HTTP 请求中其他额外的 form data
			async success(res) {
				uni.hideLoading();
				//对于uni.uploadFile，返回的数据默认是以文本形式返回的，需要手动解析成JSON格式
				let response = {};
				try {
					response = JSON.parse(res.data);
				} catch (e) {
					console.error('JSON parse error:', e);
					response = { msg: 'Invalid response format' };
				}
				resolve(response);
				console.log('响应拦截：', options, response);
				if(res.data.code == 900){
					uni.removeStorageSync("token");
					uni.showModal({
						title:'登录过期提示',
						content:'登录已过期，请重新登录',
						showCancel:false,
						success:()=>{
							uni.reLaunch({
								url:"/pages/login/login",
							})
						}
					})
				}else{
					uni.showToast({
						title: response.msg || response.error,
						icon: response.code == 1?"success":"error"
					})
				}
			},
			fail(err) {
				uni.hideLoading();
				let error = {};
				try {
					error = JSON.parse(err.data);
				} catch (e) {
					console.error('JSON parse error:', e);
					error = { msg: 'Invalid error format' };
				}
				console.log('请求失败：', error);
				uni.showToast({
					icon: "error",
					title: error.msg
				})
				reject(error);
			},
			complete() {
				// uni.hideLoading();    // 在showToast之前执行会受影响
			}
		})
	});
}
