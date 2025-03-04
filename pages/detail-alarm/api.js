import {http} from "@/utils/httpUtil.js"

// 反馈报警
export function updateAlarmAPI(data) {
	return http({
		url: '/alarm/update',
		method: 'POST',
		data: data
	})	
}
