import fetch from '../utils/fetch.js'
// 设置个人资料
export function fetchHome() {
  let url = 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/home'
  return fetch({
    url,
    method: 'POST'
  })
}