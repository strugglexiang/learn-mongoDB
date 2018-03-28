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

