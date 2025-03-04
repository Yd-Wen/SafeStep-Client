import {http} from "@/utils/httpUtil.js"

// 获取设备列表
export function getDeviceListAPI(data) {
	return http({
		url: '/device/find-ava',
		data: data
	})	
}

// 获取历史活动
export function getActivityAPI(data){
	return http({
		url: '/activity/find',
		method: 'POST',
		data: data
	})
}


