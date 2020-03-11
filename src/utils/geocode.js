const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWRpdHlhdmFkYWxrYXIiLCJhIjoiY2s2aTFndGY4MDlrbzNrbXM3Nm9sdTV4YiJ9.DiUA5BgKVEOdEOZKLD-UNg"

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to server.")
        }
        else if(response.body.features.length === 0){
            callback("No results found.")
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
                location1: response.body.features[1].place_name
            })
        }
    })
}

module.exports = geocode