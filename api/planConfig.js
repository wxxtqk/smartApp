/**
 * 小程序后端接口配置文件
 * 教学计划
 */
import fetch from '../utils/fetch.js'
import {$HTTP} from './config'
// 获取所有教学计划列表
export function plan_study_list() {
  return fetch({
    url: `${$HTTP}/jeesite/a/plan/list`,
    method: 'POST'
  })
}
// 教学计划课表详情列表
export function planDetailsList(id) {
  let data= {
    courseIds: id
  }
  // console.log(data)
  return fetch({
    url: `${$HTTP}/jeesite/a/plan/course`,
    method: 'POST',
    data
  })
}

// 文章与音频显示内容接口
export function curriculumList(id, Type) {
  let data = {
    courseId: id,
    courseType: Type
  }
  return fetch({
    url: `${$HTTP}/jeesite/a/plan/courseView`,
    method: 'POST',
    data
  })
}
// 文章收藏 与 音频收藏
export function Collection(id) {
  let data= {
    courseId: id
  }
  return fetch({
    url: `${$HTTP}/jeesite/a/usercourse/collect`,
    method: 'POST',
    data
  })
}

// 购买课程显示列表
export function purchaseList(id) {
  let data = {
    id: id
  }
  return fetch({
    url: `${$HTTP}/jeesite/a/course/showbuy`,
    method: 'POST',
    data
  })
}