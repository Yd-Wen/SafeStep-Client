import {http} from "@/utils/httpUtil.js"

//用户登录
export function getContactListAPI(data) {
	return http({
		url: '/contact/find',
		data: data
	})	
}