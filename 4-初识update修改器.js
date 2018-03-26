var db = connect('learn-mongodb')

// db.workMates.update({name:'张三'},{$set:{'sex':'0','age':20}})

// db.workMates.update({name:'张三'},{$unset:{age:''}})

// db.workMates.update({name:'张三'},{$inc:{age:-3}})

// db.workMates.update({},{$set:{interest:[]}})
// db.workMates.update({},{$set:{interest:[]}},{multi:true})

// db.workMates.update({name:'希望'},{$set:{age:10}})
db.workMates.update({name:'希望'},{$set:{age:10}},{upsert:true})

print('update success')