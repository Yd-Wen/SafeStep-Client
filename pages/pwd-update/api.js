import {http} from '@/utils/httpUtil.js'

//验证初始密码
export function verifyPwdAPI(data) {
	return http({
		url: '/user/verifyPwd',
		method: 'POST',
		data: data
	})
}

//修改密码
export function resetPwdAPI(data) {
	return http({
		url: '/user/updatePwd',
		method: 'POST',
		data: data
	})
}