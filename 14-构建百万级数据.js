var db = connect('learn-mongodb')

function getRandomNum(min,max){
    let range = max - min
    let randomNum = Math.random()
    return min + Math.floor(randomNum * range)
}

// console.log(getRandomNum(100000,900000))

function getRandomUserName(min,max){
    let Strings = '1234567890qwertuiopasdfjklzxcvbnm'.split('')
    let nameLength =min + Math.floor(Math.random()*(max - min))
    let userName = ''
    for(let i = 0;i < nameLength;i++){
       userName += Strings[Math.floor(Math.random()*Strings.length)]
    }
    return userName
}

// console.log(getRandomUserName(10,20))

var millionData = []
for(let i = 0;i<2000000;i++){
    millionData.push({
        userName:getRandomUserName(10,20),
        num0:getRandomNum(5,10)
    })
}

db.millionData.insert(millionData)

print('millionDate is in success')