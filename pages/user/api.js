import {http} from '@/utils/httpUtil.js'

// 获取用户信息
export function getUserInfoAPI(data) {
	return http({
		url: '/user/detail',
		data: data
	})
}
