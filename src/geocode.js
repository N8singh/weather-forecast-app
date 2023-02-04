const request = require('postman-request')

const geocode = (address, callback) => {

    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?limit=1&key=uhpMOPULeJbpOWXZ00euegPAoXV0hoT7`

    request({url, json : true}, (error,{body}) => {
        const {lat,lon } = body.results[0].position
        const {freeformAddress : place} = body.results[0].address
        if(error){
            callback("Unable to connect to geocoding api",undefined)
        }
        else if(body.errorText){
            callback('Unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined, {
                lat : lat,
                lon : lon,
                place : place
            })
        }

    })
}

module.exports = geocode