var db = connect("learn-mongodb")

// db.workMates.update({},{})

// db.workMates.update({name:'希望'},{$push:{interest:'兴趣2'}})
// db.workMates.update({name:'strgglexiang'},{$push:{interest:'兴趣1'}},{upsert:true}
// db.workMates.update({name:'张三'},{$push:{'skills':'兴趣1'}})

// db.workMates.update({name:'希望'},{$set:{something:{x:1}}})
// db.workMates.update({name:'希望'},{$push:{'something.s':'2'}})

// db.workMates.update({'name':'希望',interest:{$ne:'读书'}},{$push:{interest:'读书'}})
// db.workMates.update({'name':'希望',interest:{$ne:'1读书'}},{$push:{interest:'看黄片'}})
// db.workMates.update({'name':'希望'},{$addToSet:{interest:"打架"}})

// var interests = ['sing','dance','ss']
// db.workMates.update({name:'希望'},{$addToSet:{interest:{$each:interests}}})

// db.workMates.update({name:'希望'},{$pop:{interest:1}})


db.workMates.update({name:'希望'},{$set:{'something.s.0':'up'}})

print('update success!')