var userName = 'strugglexiang' //登陆用户名
var loginTime = Date.parse(new Date())// 登陆时间戳
var jsonData = {
 loginUser:userName,
 loginTime:loginTime
} // 模拟数据

var db = connect('learn-mongodb') // 链接数据库，相当于 use learn-mongodb

db.loginLog.insert(jsonData)

print ('insert log sucess')