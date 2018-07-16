/**
 * 小程序后端接口配置文件
 * 教学计划
 */

// var planConfig = {
//   host,
//   plan_study_list: `${host}/studyPlanList`,
//   // plan_study_details: `${host}/detailsList`,
// }

// 对外把对象planConfig返回
// module.exports = planConfig

import fetch from '../utils/fetch.js'
var host = "https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159"
// 教学计划列表
export function plan_study_list(data) {
  let url = `${host}/studyPlanList`
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 教学计划课表详情列表
export function planDetailsList(planId) {
  let url = `${host}/detailsList`
  let data= {
    planId: planId
  }
  return fetch({
    url,
    method: 'POST',
    data
  })
}