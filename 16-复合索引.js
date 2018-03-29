var db = connect("learn-mongodb")

var startTime = new Date().getTime()

var rs = db.millionData.find(
    {
      userName:'r3jks8ucuvcsmr',
      num0:7,
    }
).hint({num0:1})

rs.forEach(rs => { printjson(rs) })

var runTime =  new Date().getTime() - startTime

print('runtime is ' + runTime + 'ms')