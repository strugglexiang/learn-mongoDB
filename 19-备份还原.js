//备份
mongodump --host 127.0.0.1 --port 27017 --out C:\Users\Public\Desktop

//删除集合
db.workMates.drop()

//还原
mongorestore --host 127.0.0.1 --port 27017 C:\Users\Public\Desktop