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
                dailySummary: response.body.daily.data[0].summary,
                dailyTemperature: response.body.daily.temperature,
                currTemperature: response.body.currently.temperature,
                currSummary: response.body.currently.summary,
                dailyPrecipType: response.body.daily.data[0].precipType,
                dailyPrecipProbability: response.body.daily.data[0].precipProbability
            })
        }
    })
}
module.exports = forecast