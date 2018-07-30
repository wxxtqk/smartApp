/**
 * 小程序后端接口配置文件
 * 教学计划
 */
import fetch from '../utils/fetch.js'

var host = "https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159"
// 获取所有教学计划列表
export function plan_study_list() {
  // let data = {
  //   openId: id
  // }
  return fetch({
    url: 'http://192.168.199.99:8181/jeesite/a/plan/list',
    // url: `${host}/studyPlanList`,
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
    // url: `${host}/detailsList`,
    url: 'http://192.168.199.99:8181/jeesite/a/plan/course',
    method: 'POST',
    data
  })
}
// 文章内容展示列表
// export function curriculumList(id) {
//   let data = {
//     subjectId: id
//   }
//   return fetch({
//     url: `${host}/curriculumList`,
//     method: 'POST',
//     data
//   })
// }
// // 文章收藏
// export function Collection(typeState) {
//   let url = `${host}/Collection`
//   let data= {
//     collectionType: typeState
//   }
//   return fetch({
//     url,
//     method: 'POST',
//     data
//   })
// }
// 音频课程显示列表
export function voiceList() {
  let url = `${host}/voiceList`
  return fetch({
    url,
    method: 'POST',
  })
}

// 音频课程收藏
export function voiceCollection(typeState) {
  let url = `${host}/voiceCollection`
  let data= {
    collectionType: typeState
  }
  return fetch({
    url,
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
    // url: `${host}/curriculumList`,
    url: 'http://192.168.199.99:8181/jeesite/a/plan/courseView',
    method: 'POST',
    data
  })
}
// 文章收藏 与 音频收藏
export function Collection(id) {
  // let url = `${host}/Collection`
  let data= {
    courseId: id
  }
  return fetch({
    url: 'http://192.168.199.98:8080/jeesite/a/usercourse/collect',
    method: 'POST',
    data
  })
}

// 购买课程显示列表
export function purchaseList() {
  let url = `${host}/purchaseList`
  return fetch({
    url,
    method: 'POST',
  })
}