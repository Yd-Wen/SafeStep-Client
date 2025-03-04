import {http} from "@/utils/httpUtil.js"

//获取报警信息
export function getAlarmListAPI(data) {
	return http({
		url: '/alarm/find',
		data: data,
		method: 'POST'
	})	
}

// 获取可用设备列表
export function getDeviceListAPI(data) {
	return http({
		url: '/device/find-ava',
		data: data
	})	
}