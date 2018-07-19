// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }
// const formatDate = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()

//   return [year, month, day].map(formatNumber).join('-')
// }
// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
// const formatTimeNew = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()
//   return [hour, minute, second].map(formatNumber).join(':')
// }
// module.exports = {
//   formatTime: formatTime,
//   formatDate: formatDate,
//   formatTimeNew: formatTimeNew
// }

function formatTime(time){
  if(typeof time !== 'number' || time < 0){
    return time
  }
  var hour = parseInt(time/ 3600)
  time = time % 3600
  var minte = parseInt(time / 60)
  time = parseInt( time % 60)
  var second = time
   
  return ([minte, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

module.exports = {
  formatTimeNew: formatTime
}