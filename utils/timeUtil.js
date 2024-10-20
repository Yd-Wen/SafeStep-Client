import moment from 'moment-timezone';

/**
 * 格式化日期时间字符串
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} - 格式为 "YYYY-MM-DD HH:MM:SS" 的字符串
 */
function formatDateTime(date) {
  return moment.tz(date, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}

export { formatDateTime };