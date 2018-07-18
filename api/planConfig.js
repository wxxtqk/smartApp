/**
 * 小程序后端接口配置文件
 * 教学计划
 */
import fetch from '../utils/fetch.js'

var host = "https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159"
// 教学计划列表
export function plan_study_list(data) {
  // let data = {
  //   openId: id
  // }
  let url = `${host}/studyPlanList`
  // let url = 'https://134.175.27.67/jeesite-master/a/plan/list'
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
// 文章内容展示列表
export function curriculumList(id) {
  let url = `${host}/curriculumList`
  let data= {
    subjectId: id
  }
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 文章收藏
export function Collection(typeState) {
  let url = `${host}/Collection`
  let data= {
    collectionType: typeState
  }
  return fetch({
    url,
    method: 'POST',
    data
  })
}