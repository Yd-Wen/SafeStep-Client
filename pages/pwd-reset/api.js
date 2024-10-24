import {http} from '@/utils/httpUtil.js'

//获取验证码
export function requestCodeAPI(data) {
	return http({
		url: '/sms/send',
		data: data
	})	
}

//校验验证码
export function verifyCodeAPI(data) {
	return http({
		url: '/sms/verify',
		data: data
	})	
}

//重置密码
export function resetPwdAPI(data) {
	return http({
		url: '/user/updatePwd',
		method: 'POST',
		data: data
	})
}