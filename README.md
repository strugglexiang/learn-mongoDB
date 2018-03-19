# learn-mongoDB
mongoDB 数据库学习

# mongoDB 的安装与配置
1. 官网下载 www.mongodb.com
2. 默认安装（complete）
3. 配置
```
1.环境变量
C:\Program Files\MongoDB\Server\3.6\bin
2.文件配置
mkdir data
cd data 
mkdir db
```
# 图形界面

4. 启动
mongod 启动mongoDB服务
mongo 连接数据库

# mongoDB 介绍
1.非关系型数据库
2.存储结构
数据库 -----  数据库
数据表 -----  集合
数据行 -----  文件(对象)

# mongoDB-shell-1
```
1.查看所有数据库
show dbs 
2.进入数据库
use DBname
3.当前数据库
db
4.查看所有集合
show collections
```
# mongoDB-shell-2
```
1.创建数据库
use DBname 这条命令不仅仅是查看，还能创建。如果是创建，数据库中没有集合或者集合中没有文件，db是看不到的

2.创建集合并插入数据
db.集合名.instert({"name":"strugglexiang"})

3.查看集合
db.集合名.find() 查看该集合所有文件
db.集合名.findOne() 查看集合第一个文件
db.集合名.find({}) 按条件查询文件  ?

4.修改集合中文件
db.集合名.update({条件},{修改后})

5.删除集合中的文件
db.集合名.remove({条件})

6.删除集合
db.集合名.drop() 如果只有一个集合,数据库应该都没有了

7.删除数据库
db 首先要进入数据库中,当前是哪个数据库
db.dropDatabase() 删除数据库
```



