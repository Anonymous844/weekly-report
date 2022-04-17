import request from './request';

/**
 * @description 获取存在的所有周报日期
 */
export const getWeeklyDate = () => request({
  method: 'get',
  url: 'weeks'
})
/**
 * @description 获取当周所有周报
 */
export const getReportByWeek = date => request({
  method: 'get',
  url: 'reportList',
  params: {
    date
  }
})
/**
 * @description 新增周报
 */
export const addReport = data => request({
  method: 'post',
  url: 'report/add',
  data: data
})
/**
 * @description 编辑周报
 */
export const editReport = data => request({
  method: 'post',
  url: 'report/edit',
  data: data
})
/**
 * @description 删除周报
 */
export const deleteReport = id => request({
  method: 'delete',
  url: 'report/delete',
  data: {
    id
  }
})
