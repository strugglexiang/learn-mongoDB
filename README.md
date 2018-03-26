# learn-mongoDB
mongoDB 数据库学习

# 一.mongoDB 的安装与配置
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
# 二.图形界面

# 三.启动
1. mongod 启动mongoDB服务
2. mongo 连接数据库

# 四.mongoDB 介绍
1. 非关系型数据库
2. 存储结构
数据库 -----  数据库
数据表 -----  集合
数据行 -----  文件(对象)

# 五.mongoDB-基础命令-1
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
# 六.mongoDB-基础命令-2
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

# 七.用js写mongo shell
在cmd中，或者类似bash命令行中直接敲命令行太难受了，需要用一种更好的工作方式，那就是用js来写mongo shell
```
写之前注意：mongo shell 对es6的支持度不够好，最好用es5的写法

var userName = 'strugglexiang' //登陆用户名
var loginTime = Date.parse(new Date())// 登陆时间戳
var jsonData = {
 loginUser:userName,
 loginTime:loginTime
} // 模拟数据

var db = connect('learn-mongodb') // 链接数据库，相当于 use learn-mongodb

db.loginLog.insert(jsonData)

print ('insert log sucess')


最后当前文件路径下运行该文件(vsCode中ctrl + ~打开终端)
mongo ...

```

# 八.批量插入
数据库性能最重要的是能够快速插入和快速查询
现在对比快速插入和循环插入的性能
3.2以前版本的批量插入
db.集合.batchInsert(array)
```
var db = connect('learn-mongodb')
var startTime = new Date().getTime()

循环插入
for(var i = 0;i<1000;i++){
  db.compareInertTime.insert({
      num:1
  })
}

批量插入
var temp = []
for(var i = 0;i<1000;i++){
    temp.push({
      num:1
    })
}


var runTime = new Date().getTime() - startTime
print('runTime is'+ runTime + 'ms')
```
结果是循环插入的时间是批量插入时间的很多倍


# 九.update常见错误1
一般来说，update({条件},{修改后})
这里是用修改后的对象替换修改前的对象，所以修改后的对象一定要写全，不要像关系型数据库那样只写要修改的字段
```
这里只是用来准备下一节的数据,马冬梅性别应该是0
var db = connect('learn-mongodb')
var workMate1 = {
    name:'张三',
    sex:'1',
    skills:[
        '吃饭'
    ]
}

var workMate2 = {
    name:'李四',
    sex:'1',
    skills:[
        '睡觉'
    ]
}

var workMate3 = {
    name:'马冬梅',
    sex:'1',
    skills:[
        '装逼'
    ]
}

var temp = [workMate1,workMate2,workMate3]

db.workMates.insert(temp)

```
mongodb命令行中可以这样
```
mongo
load('./3-update常见错误.js')
```

# 十.初识update修改器
```
 $set修饰符：修改或添加属性
 db.集合.update({条件},{$set:{'修改键':'值','添加键':'值'}})

 $unset修饰符：删除属性
 db.集合.update({条件},{$unset:{'删除键':'值随便（可以为空）'}})
 
 $inc修饰符:对数字进行操作，非数字无效
 db.集合.update({条件},{$inc:{'键'：-1}})
 
 multi选项：对所有查询到的条件进行修改
 db.集合.update({},{$set:{interest:[]}},{multi:true})  取值true，对所有执行，默认false
 
 upsert选项:没有则添加文件
 db.集合.update({name:'xiangwang'},{'age':'10'},{upsert:true}) 取值true,没有则添加数据行（文件）
```
```
var db = connect('learn-mongodb')

// db.workMates.update({name:'张三'},{$set:{'sex':'0','age':20}})

// db.workMates.update({name:'张三'},{$unset:{age:''}})

// db.workMates.update({name:'张三'},{$inc:{age:-3}})

// db.workMates.update({},{$set:{interest:[]}})
// db.workMates.update({},{$set:{interest:[]}},{multi:true})

// db.workMates.update({name:'希望'},{$set:{age:10}})
db.workMates.update({name:'希望'},{$set:{age:10}},{upsert:true})

print('update success')
```

# 十一.update修改器之数组操作
```
$push:往数组中添加
db.集合.update({条件},{$push:{数组键:'添加值'}})

$push:给对象中值赋值为数组
db.集合.update({条件},{$push:{'对象.键':'添加值'}})  最终值是数组


数组定位修改
db.集合.update({条件},{$set:{'数组键.3':'修改值'}})  //这里一定要打引号,和内嵌数据（对象)一样

$pop:删除数组开头或者末尾
db.集合.update({条件},{$pop:{数组键:1}})  1代表删除末尾，-1代表删除开头

$ne：有就修改，没有就不修改
$addToSet: $ne 的升级版
db.集合.update({name:'张三',"interest":{$ne:'读书'}},{$push:{interest:'读书'}})
insterest数组中有读书爱好就不添加，没有就添加
db.集合.update({name:'张三'},{$addToSet:{'insterest':'读书'}})

$each：数组中批量添加
var interests = ['sing','dance','code']
db.集合.update({name:'张三'},{$addToSet:{'insterest':{$each:interests}}}

$set:数组定位修改
db.集合.update({条件},{$set:{'对象.1':'修改值'}}) 


```


















