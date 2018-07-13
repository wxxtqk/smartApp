function fetch ({url, data={}, method='POST'}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            method,
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                resolve(res)
            },
            fail: function(e) {
                reject(e)
            },
            complete: function(e) {
                reject(e)
            }
        })
    })
}
export default fetch