const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars enignine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Aditya Vadalkar"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Me",
        name: "Aditya Vadalkar"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: "This is the help page.",
        title: "Help",
        name: "Aditya Vadalkar"
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({ error })
            }
            res.send({
                dailySummary: forecastData.dailySummary,
                locationString: location,
                address: req.query.address,
                dailyTemperature: forecastData.dailyTemperature,
                currTemperature: forecastData.currTemperature,
                currSummary: forecastData.currSummary,
                dailyPrecipType: forecastData.dailyPrecipType,
                dailyPrecipProbability: forecastData.dailyPrecipProbability
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a valid search term."
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        errorText: "Help article not found.",
        title: "404 not found",
        name: "Aditya Vadalkar"
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        errorText: "Page does not exist.",
        title: "404 not found",
        name: "Aditya Vadalkar"
    })
})

app.listen(port, () => {
    console.log("Server listening on port " + port)
})