var db = connect('learn-mongodb')

//分页和排序
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

//$where修饰符 强大的查询功能但是尽量少用
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