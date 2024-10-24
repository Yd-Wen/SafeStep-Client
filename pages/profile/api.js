import {http} from '@/utils/httpUtil.js'

// 获取用户信息
export function getUserInfoAPI(data) {
	return http({
		url: '/user/detail',
		data: data
	})
}

// 更新用户信息
export function updateUserInfoAPI(data) {
	return http({
		url: '/user/update',
		method: 'POST',
		data: data
	})
}