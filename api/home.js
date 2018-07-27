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
export function fecthMinClass() {
  let url = 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/deatil'
  return fetch({
    url,
    method: 'POST'
  })
}
// 获取企业
export function fectDemon() {
  let url = 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/demon'
  return fetch({
    url,
    method: 'POST'
  })
}