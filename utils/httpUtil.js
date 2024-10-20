export function http(options, loading = true) {
	const baseUrl = "http://localhost:8080"
	
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
				token:uni.getStorageSync("token")||''
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
						icon: res.data.code > 1?"none":"success"
					})
				}
			},
			fail(err) {
				uni.hideLoading();
				console.log('请求失败：', err);
				uni.shoeToast({
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
