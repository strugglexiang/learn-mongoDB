var db = connect("learn-mongodb")

// db.millionData.find().limit(15).skip(20000).sort({num0:1})
// db.millionData.find().limit(15).skip(20000)
// 上面这两条证明是先排序后查询，而不是先查询后排序


var startTime = new Date().getTime()

var rs = db.millionData.find({userName:'8zqj95fkxtnna2'})
rs.forEach(result => {printjson(result)})

var runTime = new Date().getTime() - startTime
print('runtime is ' + runTime +'ms')

// 经检测，这段代码耗费900多ms


//建立索引
// db.millionData.ensureIndex({userName:1}) //为属性username建立索引
// db.millionData.getIndexes() //差看本集合的索引值(默认有id索引)
//删除索引
// db.millionData.dropIndex({'userName':1}) 填key值，这个应该常用，和字段名对应
// db.millionData.dropIndex('userName_1') 填name值
/*
var startTime = new Date().getTime()

var runTime = new Date().getTime() - startTime
print('runtime is ' + runTime +'ms')
*/
