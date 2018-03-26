var db = connect('learn-mongodb')
var startTime = new Date().getTime()

//循环插入
// for(var i = 0;i<1000;i++){
//   db.compareInertTime.insert({
//       num:1
//   })
// }

//批量插入
var temp = []
for(var i = 0;i<1000;i++){
    temp.push({
      num:1
    })
}

var runTime = new Date().getTime() - startTime
print('runTime is'+ runTime + 'ms')