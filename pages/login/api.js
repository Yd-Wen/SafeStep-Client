import {http} from "@/utils/httpUtil.js"

//用户登录
export function loginUserAPI(data) {
	return http({
		url: '/user/login',
		method: 'POST',
		data: data
	})	
}
