
1.
db.orders.aggregate(
    [
        {
            $project:{
                time: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            }
        }
    ]
)

2.
var start = new Date(2014, 6, 14);//2014年7月14日
var end = new Date(2014, 6, 31); //2014年7月31日，6代表7月，从0开始数 ，0-11
db.orders.aggregate([
{ $match: { 'create_at': {"$gte" : new Date(2014, 6, 14) , '$lte' : new Date(2014, 6, 31)}} },
])

3.
db.orders.aggregate([
        { 
            $match: { createdAt: {$gte:new Date(2018,3,23)}} 
        },
])

db.orders.find({
    createdAt:{
        $gte:new Date(2018,3,23)
    } 
})

4.
db.orders.aggregate([
    {
        $match:{
            $gte:new Date()
        }
    }
])

5.
db.orders.aggregate([  
    {
        $group: {  
            _id: { 
                second: {$second:'$createdAt'}, 
                minute: {$minute:'$createdAt'},
                hour: {$hour:'$createdAt'},
                // day: { $dayOfMonth: "$createdAt" },
                // month: { $month: "$createdAt" },  
                // year: { $year: "$createdAt" },
                count: {$sum: 1},
                // goodName:'$goodName',
                // total:'$total',
                // payWay:'$payWay',
            },   
       }  
    },  
]); 

6.

db.orders.aggregate([
    {
       $match:{
         createdAt :{$gte:new Date('04/23/2018')}
       }
    },
    {
        $group: {
            _id:{
                second: {$second:'$createdAt'}, 
                minute: {$minute:'$createdAt'},
                hour: {$hour:'$createdAt'},
            },
        }
    },
])
new Date()

(new Date()).getDate()//月的某天
(new Date()).getUTCDate()//月的某天

(new Date()).getFullYear()//
(new Date()).getUTCMonth()

(new Date()).getMonth()//月 0 - 11
(new Date()).getUTCMonth()

(new Date()).getHours()
(new Date()).getUTCHours()