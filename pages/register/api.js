import {http} from "@/utils/httpUtil.js"

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

//注册用户
export function registerUserAPI(data) {
	return http({
	url: '/user/register',
	method: 'POST',
	data: data
	})	
}