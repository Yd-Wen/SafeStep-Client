import {http} from "@/utils/httpUtil.js"

// 添加设备
export function registerContactAPI(data) {
	return http({
		url: '/contact/register',
		method: 'POST',
		data: data
	})	
}