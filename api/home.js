import fetch from '../utils/fetch.js'
import {$HTTP} from './config'
// 获取首页所有数据
export function fetchHome() {
  let url = `${$HTTP}/jeesite/a/course/first`
  return fetch({
    url,
    method: 'POST'
  })
}
// 点击大类进入小类
export function fecthMinClass(data) {
  let url = `${$HTTP}/jeesite/a/classify/fistList`
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 获取企业
export function fectDemon(data) {
  let url = `${$HTTP}/jeesite/a/company/showcompany`
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 点击查看更多
export function fetchMore(data) {
  let url = `${$HTTP}/jeesite/a/course/more`
  return fetch({
    url,
    method: 'POST',
    data
  })
}
// 点击查看更多企业
export function fetchMoreCompany(data) {
  let url = `${$HTTP}/jeesite/a/company/showall`
  return fetch({
    url,
    method: 'POST',
    data
  })
}