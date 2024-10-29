import {http} from "@/utils/httpUtil.js"

// 添加设备
export function registerDeviceAPI(data) {
	return http({
		url: '/device/register',
		method: 'POST',
		data: data
	})	
}