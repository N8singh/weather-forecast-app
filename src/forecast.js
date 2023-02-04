const request = require('postman-request')

const forecast = (lat,lon,callback) => {
   const url = `http://api.weatherstack.com/current?access_key=fbfdc0e7456134cf97e3cd2acd0c6ccb&query=${lat},${lon}&units=m`

    request({url, json : true}, (error,{body}) => {
        const {weather_descriptions: mausam, temperature,feelslike,humidity} = body.current
    if(error){
        callback('Unable to connect with weatherstack api',undefined)
    }
    else{
    callback(undefined,`The weather is ${mausam} and It's currently ${temperature} degrees out. But it feels like ${feelslike} degrees out! Also, the humidity is ${humidity} %`)
    }
} )

}

module.exports = forecast