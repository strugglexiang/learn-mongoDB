//不等修饰符
var db=connect('learn-mongodb');

//简单查询
// db.workMates.find({name:'JSPang'})

//简单查询控制输出内容
// db.workMates.find(
//     {name:'JSPang'},
//     {
//         _id:0,
//         name:1,
//         skill:1
//     }
// )

//不等修饰符
// db.workMates.find(
//     {
//         age:{
//            $gte:25,
//            $lte:30
//         }
//     },
//     {
//         _id:0,
//         name:1,
//         age:1,
//         // skill:1,
//     }
// )

// 日期查询
// var date = new Date('03/26/2018')
// db.workMates.find(
//     {
//         regeditTime:{
//             $gt:date
//         } 
//     }
// )
