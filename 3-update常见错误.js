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

print('insert success!')