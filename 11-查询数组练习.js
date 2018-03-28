var db = connect("learn-mongodb")

//精确匹配
//1.[]精确匹配
db.workMates.find(
    {
        interest:['写代码','篮球','游泳']
    },
    {
        _id:0,
        name:1,
        interest:1
    }
)

db.workMates.find(
    {
        interest:['写代码'] //因为都是3项，这里只有1项是完全匹配不到的
    },
    {
        _id:0,
        name:1,
        interest:1
    }
)

//模糊匹配
//1.$all：同事匹配多项
db.workMates.find(
    {
        interest:{
            $all:['看电影']
        }
    },
    {
        _id:0,
        name:1,
        interest:1
    }
)

db.workMates.find(
    {
        interest:{
            $all:['看电影','看书']
        }
    },
    {
        _id:0,
        name:1,
        interest:1
    }
)

// 2.$in 同时匹配多项中的几项 
db.workMates.find(
    {
        interest:{
            $in:['看电影','看书']
        }
    },
    {
        _id:0,
        name:1,
        interest:1
    }
)

// 数组显示选项$slice:这里注意是$slice后面跟的是数组下标
//前一项
db.workMates.find(
    {},
    {
        name:1,
        age:1,
        _id:0,
        interest:{$slice:1}
    }
)
//前两项
db.workMates.find(
    {},
    {
        name:1,
        age:1,
        _id:0,
        interest:{$slice:2}
    }
)
//几项间
db.workMates.find(
    {},
    {
        name:1,
        age:1,
        _id:0,
        interest:{$slice:[3,4]}
    }
)

