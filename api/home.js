import fetch from '../utils/fetch.js'
// 获取首页所有数据
export function fetchHome() {
  let url = 'http://192.168.199.98:8080/jeesite/a/course/first'
  return fetch({
    url,
    method: 'POST'
  })
}
// 点击大类进入小类
export function fecthMinClass(data) {
  let url = 'http://192.168.199.99:8181/jeesite/a/classify/fistList'
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 获取企业
export function fectDemon(data) {
  let url = 'http://192.168.199.98:8080/jeesite/a/company/showcompany'
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 点击查看更多
export function fetchMore(data) {
  let url = 'http://192.168.199.98:8080/jeesite/a/course/more'
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 点击查看更多企业
export function fetchMoreCompany() {
  let data = Object.freeze({isDisplay: 1}) // 冻结一个对象
  let url = 'http://192.168.199.98:8080/jeesite/a/company/showall'
  return fetch({
    url,
    method: 'POST',
    data
  })
}