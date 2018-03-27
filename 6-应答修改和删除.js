var db = connect("learn-mongodb")

// 普通修改，没有应答
// var data = new Date()
// print(data)
// db.workMates.update({name:'张三'},{$set:{age:21,time:data}})

//runCommand()应答
// db.workMates.update({name:'张三'},{$set:{age:10}})
// var resultMassage = db.runCommand({
//     getLastError:1
// })
// print(resultMassage)
// printjson(resultMassage)
// if(resultMassage.updatedExisting){
//     print('修改成功')
// }else{
//     print('修改失败')
// }

//findAndModify
var json = {
    findAndModify:"workMates", //修改的集合
    query:{name:'JSPang'},
    update:{$set:{age:100}},
    // remove:, //是否删除查找到的文档，值填写true，可以删除。
    new:true, //返回修改后的数据
    fields:{_id:0,name:1,age:1}, //需要返回的字段
    // upsert:, //没有这个值是否增加。
}
var result = db.runCommand(json)
printjson(result)
if(result.ok  === 1){

}else{

}
