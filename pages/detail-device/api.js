import {http} from "@/utils/httpUtil.js"

// 修改设备详情
export function updateDeviceAPI(data) {
	return http({
		url: '/device/update',
		method: 'POST',
		data: data
	})	
}

// 删除设备
export function deleteDeviceAPI(data) {
	return http({
		url: '/device/unregister',
		data: data
	})	
}