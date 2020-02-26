const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/6c30d8652fff9c30ce47148e0b7b3897/"+encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si"
    request({ url: url, json: true}, (error, response) =>{
        if(error){
            callback("Unable to connect to the server.",undefined)
        }
        else if(response.body.error){
            callback("Unable to find location.", undefined)
        }
        else{
            callback(undefined, {
                summary: response.body.daily.summary,
                temperature: response.body.currently.temperature
            })
        }
    })
}
module.exports = forecast