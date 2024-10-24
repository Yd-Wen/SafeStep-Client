/*
 * @Author Yd Wen
 * 校验账号/手机号 
 */
function validAccount(account) {
	// 正则表达式，匹配11位手机号
	const regex = /^1[13456789]\d{9}$/; 
	if(!regex.test(account)){
		uni.showToast({
			title: '手机号不合规',
			icon: 'none'
		})
		return false;
	}
	return true;
}

/*
 * @Author Yd Wen
 * 校验密码
 */
function validPwd(pwd) {
	// 正则表达式，匹配6-12位数字或字母
	const regex = /^[0-9a-zA-Z]{6,12}$/;
	if(!regex.test(pwd)){
		uni.showToast({
			title: '密码不合规',
			icon: 'none'
		})
		return false;
	}
	return true;
}

/*
 * @Author Yd Wen
 * 校验验证码
 */
function validVerifyCode(verifyCode) {
	// 正则表达式，匹配4位数字
	const regex = /^[0-9]{4}$/;
	if(!regex.test(verifyCode)){
		uni.showToast({
			title: '验证码不合规',
			icon: 'none'
		})
		return false;
	}
	return true;
}

export {validAccount, validPwd, validVerifyCode};
