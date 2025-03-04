import {http} from "@/utils/httpUtil.js"

//获取联系人
export function getContactListAPI(data) {
	return http({
		url: '/contact/find',
		data: data
	})	
}