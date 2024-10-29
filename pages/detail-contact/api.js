import {http} from "@/utils/httpUtil.js"

// 修改联系人详情
export function updateContactAPI(data) {
	return http({
		url: '/contact/update',
		method: 'POST',
		data: data
	})	
}

// 删除联系人
export function deleteContactAPI(data) {
	return http({
		url: '/contact/unregister',
		data: data
	})	
}