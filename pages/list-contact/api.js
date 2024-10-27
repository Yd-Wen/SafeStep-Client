import {http} from "@/utils/httpUtil.js"

//用户登录
export function getDeviceListAPI(data) {
	return http({
		url: '/device/find',
		data: data
	})	
}