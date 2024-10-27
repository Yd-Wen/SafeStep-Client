import {http} from "@/utils/httpUtil.js"

//获取设备列表
export function getDeviceListAPI(data) {
	return http({
		url: '/device/find',
		data: data
	})	
}