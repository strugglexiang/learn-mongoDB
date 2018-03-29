var db = connect("learn-mongodb")

db.info.insert({contextInfo:"I am a programmer, I love life, love family. Every day after work, I write a diary."})
db.info.insert({contextInfo:"I am a programmer, I love PlayGame, love drink. Every day after work, I playGame and drink."})
db.info.insert({contextInfo:'由于所有的实例对象共享同一个 prototype 对象，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像"继承"了prototype对象一样。'})

//建立全文索引
db.info.ensureIndex({contextInfo:'text'})
db.info.getIndexes()
db.info.dropIndex('contextInfo_text')
//使用全文索引
db.info.find(
    {
        $text:{
            $search:'共享'
        }
    }
)

db.info.find(
    {
        $text:{
            $search:'drink life '
        }
    }
)

db.info.find(
    {
        $text:{
            $search:'drink -life '
        }
    }
)

db.info.find(
    {
        $text:{
            $search:"\'对象，那么\'"
        }
    }
)

db.info.find(
    {
        $text:{
            $search:"\'实力\'"
        }
    }
)
