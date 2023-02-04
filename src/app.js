const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')
const port = process.env.PORT || 3000

const app = express()


//Defining paths for express config
const publicHtm = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set up handlebars and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Set up static directory to serve
app.use(express.static(publicHtm))

app.get('', (req,res) => {
    res.render('index', {
        name: 'Bisal Kumar',
        title : 'Weather Application'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : "About the author",
        name : "Bisal Kumar"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        contact : 'bisalk@gmail.com',
        message : 'In case you need any help, please contact: ',
        title : 'Help page',
        name : 'Bisal Kumar'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return res.send({
            error : "Please provide address"
        }) 
    }
    geocode(req.query.address,(error, {lat,lon,place}) => {
        if(error){
         return res.send(error)
        }
    
        forecast(lat,lon, (error, forecastData) => {
            if(error){
             return res.send(error)
            }

            res.send({
                place,
                lat,lon,
                forecast : forecastData
          })
    })
    
})

})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        message : "Help article not found!",
        name : "Bisal Kumar"
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        title : "Error 404",
        message : "page not found",
        name : "Bisal Kumar"
    })
})

app.listen(port, () => {
    console.log(`At port ${port} , Server is up and running.....`)
})