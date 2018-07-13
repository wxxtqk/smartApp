/**
 * 小程序后端接口配置文件
 * 教学计划
 */
var host = "https://dsn.apizza.net/mock/198f9600070e6d58394193f636384159"

var planConfig = {
  host,
  plan_study_list: `${host}/studyPlanList`,
}

// 对外把对象planConfig返回
module.exports = planConfig