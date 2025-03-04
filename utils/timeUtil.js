import moment from 'moment-timezone';

// 设置默认时区为'Asia/Shanghai'
moment.tz.setDefault('Asia/Shanghai');

/**
 * 格式化日期时间字符串
 * @author Yd Wen
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} - 格式为 "YYYY-MM-DD HH:MM:SS" 的字符串
 */
export function formatDateTime(date) {
	return moment.tz(date, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 格式化日期时间字符串
 * @author Yd Wen
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} - 格式为 "YYYY-MM-DD" 的字符串
 */
export function formatDate(date){
	return moment.tz(date, 'Asia/Shanghai').format('YYYY-MM-DD');
}

/**
 * 获取当日初始时间
 * @author Yd Wen
 * @returns {string} - 格式为 "YYYY-MM-DD HH:MM:SS" 的字符串
 */
 export function getDayStart() {
	// 使用moment-timezone创建当前日期时间对象，并设置时间为00:00:00
    const start = moment.tz('Asia/Shanghai').startOf('day');
    // 格式化并返回日期字符串
    return start.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 获取当周初始时间
 * @author Yd Wen
 * @returns {string} - 格式为 "YYYY-MM-DD HH:MM:SS" 的字符串
 */
 export function getWeekStart() {
	// 使用moment-timezone创建当前日期时间对象，并设置时间为00:00:00
    const start = moment.tz('Asia/Shanghai').startOf('week');
    // 格式化并返回日期字符串
    return start.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 获取当月初始时间
 * @author Yd Wen
 * @returns {string} - 格式为 "YYYY-MM-DD HH:MM:SS" 的字符串
 */
 export function getMonthStart() {
	// 使用moment-timezone创建当前日期时间对象，并设置时间为00:00:00
    const start = moment.tz('Asia/Shanghai').startOf('month');
    // 格式化并返回日期字符串
    return start.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 获取当年初始时间
 * @author Yd Wen
 * @returns {string} - 格式为 "YYYY-MM-DD HH:MM:SS" 的字符串
 */
 export function getYearStart() {
	// 使用moment-timezone创建当前日期时间对象，并设置时间为00:00:00
    const start = moment().subtract(1, 'years').startOf('year');
    // 格式化并返回日期字符串
    return start.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 获取当前日期
 * @author Yd Wen
 * @@return {string}
 */
export function getDateNow(){
	return formatDate(Date.now())
}

/**
 * 获取当前时间
 * @author Yd Wen
 * @return {string}
 */
export function getTimeNow(){
	return formatDateTime(Date.now())
}

/**
 * 获取时间差
 * @author Yd Wen
 * @return {string}
*/

export function getTimeDiff(utcTimeString) {
    // 将传入的UTC时间字符串转换为Date对象
    const utcDate = new Date(utcTimeString);
    // 获取当前时间的Date对象
    const now = new Date();
    // 计算两个时间之间的差值（以毫秒为单位）
    const diffMs = now - utcDate;
    
    // 转换为不同的时间单位
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30); // 近似一个月为30天
    const diffYears = Math.floor(diffMonths / 12);

    // 根据不同的时间差返回相应的描述
    if (diffYears > 0) {
        return `${diffYears}年前`;
    } else if (diffMonths > 0) {
        return `${diffMonths}个月前`;
    } else if (diffDays > 0) {
        return `${diffDays}天前`;
    } else if (diffHours > 0) {
        return `${diffHours}小时前`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes}分钟前`;
    } else {
        return '刚刚';
    }
}

/**
 * 获取当前时间是否过期
 * @author Yd Wen
 * @return {boolean}
 */
export function isNowExpired(utcTimeString, expiration){
	// 将传入的UTC时间字符串转换为Date对象
	const utcDate = new Date(utcTimeString);
	// 获取当前时间的Date对象
	const now = new Date();
	// 计算两个时间之间的差值（以毫秒为单位）
	const diffMs = now - utcDate;
	
	return diffMs > expiration ? true: false;
}
