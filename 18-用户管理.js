//创建用户 必需在admin库下


// 建权
db.auth('strugglexiang','123456')

//建权启动服务
mongod --auth

//删除用户
db.system.users.remove({"user":'strugglexiang'})