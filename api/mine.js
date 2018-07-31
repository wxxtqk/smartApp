import fetch from '../utils/fetch.js'
// 设置个人资料
export function personalInfo({name, date, edu, phone, company, email, address}) {
    let data = {
        userName: name,
        userAddress: address,
        userBirthday: date,
        userEducation: edu,
        userPhone: phone,
        userCompany: company,
        userEmail: email
    }
    let url = 'http://192.168.199.98:8080/jeesite/a/user/save'
    return fetch({
        url,
        method: 'POST',
        data
    })
}
// 获取我的收藏
export function fetchFavorite() {
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/course/collect',
        method: 'POST'
    })
}
// 获取我的课程
export function fetchClass() {
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/course/buy',
        method: 'POST'
    })
}
// 获取浏览记录
export function fetchRecord() {
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/course/look',
        method: 'POST'
    })
}
// 获取浏览记录
export function fetchPayLog() {
    return fetch({
        url: 'https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159/paylog',
        method: 'POST'
    })
} 
// 获取企业产品
export function fetchProd(companyId) {
    let data = {
        companyId
    }
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/goods/list',
        method: 'POST',
        data
    })
}
// 删除企业产品
export function deletProd(data) {
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/goods/delete',
        method: 'POST',
        data
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
// 获取企业
export function fetchCompany() {
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/company/usercompany',
        method: 'POST'
    })
}
// 新增企业产品
export function addProd(config) {
    let data = {
        goodsPicture: config.urls.join(','),
        goodsName: config.prodname,
        goodsInner: config.proddesc,
        price: config.price,
        phone: config.prodtel,
        email: config.prodemail,
        address: config.prodaddress,
        companyId: config.companyId
    }
    if (config.id){
        data.id = config.id
    }
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/goods/save',
        method: 'POST',
        data
    })
}
// 获取企业产品-------------用于修改
export function fetchProdSingle(data) {
    return fetch({
        url: 'http://192.168.199.98:8080/jeesite/a/goods/showgoods',
        method: 'POST',
        data
    })
}
export const upload = 'http://192.168.199.99:8181/jeesite/a/resources/save'