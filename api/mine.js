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
// 获取我的课程
export function fetchClass() {
    return fetch({
        url: 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/mineclass',
        method: 'POST'
    })
}
// 获取浏览记录
export function fetchRecord() {
    return fetch({
        url: 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/record',
        method: 'POST'
    })
}
// 获取企业产品
export function fetchProd() {
    return fetch({
        url: 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/prod',
        method: 'POST'
    })
}
// 我的企业提交
export function addCompany({name, address, coll, desc, email, tel, urls}) {
    let data = {
        companyName: name,
        companyAddress: address,
        companyPicture: urls.join(','),
        companyPartner: coll,
        companyPhone: tel,
        companyEmail: email,
        companyInner:desc
    }
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/company/save',
        method: 'POST',
        data
    })
}