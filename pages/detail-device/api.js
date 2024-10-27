import {http} from "@/utils/httpUtil.js"

// 修改设备详情
export function updateDeviceAPI(data) {
	return http({
		url: '/device/update',
		method: 'POST',
		data: data
	})	
}