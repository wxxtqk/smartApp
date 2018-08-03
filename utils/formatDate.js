// 时间转换 秒转为分秒

export function formatTimeNew(time){
  if(typeof time !== 'number' || time < 0){
    return time
  }
  // var hour = parseInt(time/ 3600)
  // time = time % 3600
  var minte = parseInt(time / 60)
  time = parseInt( time % 60)
  var second = time
   
  return ([minte, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}
// console.log(formatTime(206))
