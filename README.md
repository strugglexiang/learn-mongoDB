# learn-mongoDB
mongoDB 数据库学习

## 目录
- [1-mongodb的安装与配置](#1-mongodb的安装与配置)
- [2-图形界面](#2-图形界面)
- [3-启动](#3-启动)
- [4-mongoDB-介绍](#4-mongoDB-介绍)
- [5-mongoDB-基础命令-1](#5-mongoDB-基础命令-1)
- [6-mongoDB-基础命令-2](#6-mongoDB-基础命令-2)
- [7-用js写mongo-shell](#7-用js写mongo-shell)
- [8-批量插入](#8-批量插入)
- [9-update常见错误1](#9-update常见错误1)
- [10-初识update修改器](#10-初识update修改器)
- [11-update修改器之数组操作](#11-update修改器之数组操作)
- [12-修改：状态返回与安全](#12-修改：状态返回与安全)
- [13-查找:不等修改符](#13-查找:不等修改符)
- [14-多条件查找](#14-多条件查找])
- [15-find的数组查询](#15-find的数组查询)
- [16-find的参数(分页和排序)](#16-find的参数(分页和排序))
- [17-find如何在js文本中使用](#17-find如何在js文本中使用)

# 1-mongoDB的安装与配置
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
# 2-图形界面

# 3-启动
1. mongod 启动mongoDB服务
2. mongo 连接数据库

# 4-mongoDB-介绍
1. 非关系型数据库
2. 存储结构
```
数据库 -----  数据库
数据表 -----  集合
数据行 -----  文件(对象)
```

# 5-mongoDB-基础命令-1
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

# 七.用js写mongo-shell
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
mongo 数据库外
load('./3-update常见错误.js') 数据库内
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


# 十二.修改：状态返回与安全
在时间工作中，修改很少用到db.集合.update这种形式，因为这种形式是没有应答的，得自己写print这种语句，这显然是不行的，所有要用到有应答的需改---db.runCommand()和findAndModify
db.runCommmand():
它是数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口。（几乎操作数据库的所有操作，都可以使用runCommand来执行）
```
比如我们要查看是否和数据库链接成功了，就可以使用Command命令。
db.runCommand({ping:1})
返回ok：1就代表链接正常。
```
```
db.集合.update({name:'张三'},{$set:{age:'10'}},false,true)
var resultMessage = db.runCommand({
    getLastError:1
})
prinjson(resultMessage) 

//这里就可以进行安全性控制了
if(updatedExisting){      

}else{

}
或者
if(ok === 1){

}else{

}


false：第一句末尾的false是upsert的简写，代表没有此条数据时不增加;
true：true是multi的简写，代表修改所有，这两个我们在前边课程已经学过。
getLastError:1 :表示返回功能错误，这里的参数很多，如果有兴趣请自行查找学习，这里不作过多介绍。(db.listCommands( ):查看所有的参数)
printjson：表示以json对象的格式输出到控制台。
```
findAndModify:runCommand的配置选项
```
var myModify={
    findAndModify:"workmates",
    query:{name:'张三'},
    update:{$set:{age:18}},
    new:true    //更新完成，需要查看结果，如果为false不进行查看结果
}
var ResultMessage=db.runCommand(myModify);
printjson(ResultMessage)
```
findAndModify属性值：
. query：需要查询的条件/文档
. sort:    进行排序
. remove：[boolean]是否删除查找到的文档，值填写true，可以删除。
. new:[boolean]返回更新前的文档还是更新后的文档。
. fields：需要返回的字段
. upsert：没有这个值是否增加。

# 十三.查找:不等修改符
准备数据
```
var workmate1={
    name:'JSPang',
    age:33,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate2={
    name:'ShengLei',
    age:31,
    sex:1,
    job:'JAVA后端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'J2EE',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate3={
    name:'MinJie',
    age:18,
    sex:0,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate4={
    name:'XiaoWang',
    age:25,
    sex:1,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate5={
    name:'LiangPeng',
    age:28,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate6={
    name:'HouFei',
    age:25,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate7={
    name:'LiuYan',
    age:35,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate8={
    name:'DingLu',
    age:20,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate9={
    name:'JiaPeng',
    age:29,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate10={
    name:'LiJia',
    age:26,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var db=connect('company');
var workmateArray=[workmate1,workmate2,workmate3,workmate4,workmate5,workmate6,workmate7,workmate8,workmate9,workmate10];
db.workmate.insert(workmateArray);
print('[SUCCESS]：The data was inserted successfully');
```
查找
```
1.简单查找
db.workmate.find({"skill.skillOne":"HTML+CSS"})
2.筛选字段
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},  //第一个对象是条件
    {name:true,"skill.skillOne":true}//第二对象是现实内容(mongodb中1代表true，0代表fale)
)
3.不等修饰符
小于($lt):英文全称less-than
小于等于($lte)：英文全称less-than-equal
大于($gt):英文全称greater-than
大于等于($gte):英文全称greater-than-equal
不等于($ne):英文全称not-equal

4.日期查找
MongoDB也提供了方便的日期查找方法，现在我们要查找注册日期大于2018年1月10日的数据，我们可以这样写代码。
var startDate= new Date('01/01/2018');
db.workmate.find(
    {regeditTime:{$gt:startDate}},
    {name:true,age:true,"skill.skillOne":true,_id:false}
)
```

# 十四.多条件查找
. $in：解决一键多值的查询情况
```
db.workmate.find({age:{$in:[25,33]}},
    {name:1,"skill.skillOne":1,age:1,_id:0}
)
```
. $nin：和in相反 
```
```
. $or：或  查询多个键值的情况 
```
db.workmate.find({$or:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```
. $and：和 查找几个key值都满足的情况
```
db.workmate.find({$and:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```
. $not:除了 查询除条件之外的值(这里要注意not只能用在条件里面，不像or and 用在条件外)
```
db.workmate.find({
    age:{
        $not:{
            $lte:30,
            $gte:20
        }
    }
},
{name:1,"skill.skillOne":1,age:1,_id:0}
)
```
. $nor:除了 几个条件都不满足
```
db.workMates.find(
  {
    $nor:[
      {age:{$lte:30}},
      {"skill.skillThree":'PHP'}
    ]
  },
  {
    _id:0,
    name:1,
    age:1,
    'skill.skillThree':1
  }
)

```

# 十五.find的数组查询
数组查询是和一般查询不一样的
. 完全匹配
```
1.直接使用[]是完全匹配
db.集合.find({interest:['看电影']})
2.$size 数组个数查询
db.集合.find({interest:{$size:4}}) //查询interest中数量为4的文件
```
. 模糊匹配
```
1.$all 匹配多项
db.集合.find({interest:{$all:['画画','看电影']}}) //数组中包含画画和看电影

2.$in 匹配多项的某项
db.集合.find({interest:{$in:['画画','看电影']}) //数组中包含画画或者包含看电影
```
. 数组选项$slice(在field参数中使用):有时候我们并不需要显示数组中的所有值
```
$slice后面跟的是数组下标
db.集合.find(
    {},
    {
        interest:{$slice:1} //显示第1项
        interest:{$slice:1} //显示第2项
        interest:{$slice:-1} //显示最后一项
        interest:{$slice:[3,4]}//显示第2项和第三项
    }
)
```

# 十六.find的参数(分页和排序)
5个重要参数
. query: 这个就是查询条件，MongoDB默认的第一个参数。
. fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
. limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
. skip:跳过多少个显示，和limit结合可以实现分页。
. sort：排序方式，从小到大排序使用1，从大到小排序使用-1。
```
db.workMates.find(
    {
        interest:{$all:['画画']}
    },
    {
       name:1,
       age:1,
       _id:0,
       interest:1
    }
).limit(1).skip(2).sort({age:1})
```
$where修饰符 强大的查询功能但是尽量少用
```
db.workMates.find(
    {
        $where:'this.age>30' //this指集合
    },
    {
        _id:0,
        name:1,
        age:1
    }
)
```

# 十七.find如何在js文本中使用
之前都是用直接复制命令在mongo里面查询才能返回结果
现在写完用mongo 和 load  的方法返回查询结果
```
var db = connect('learn-mongodb')

var result = db.workMates.find()  //查询结果附给result

// print(result)
// printjson(result)


//利用游标和循环
// while(result.hasNext()){
//     printjson(result.next())
// }

//forEach
result.forEach(function(result){
    printjson(result)
    // print(result)
})


```


















