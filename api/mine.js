import fetch from '../utils/fetch.js'
// 设置个人资料
export function personalInfo(data) {
    let url = 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/personal'
    return fetch({
        url,
        method: 'POST',
        data
    })
}
// 获取我的收藏
export function fetchFavorite() {
    return fetch({
        url: 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/favorite',
        method: 'POST'
    })
}