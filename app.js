// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const Restaurant = require('./models/restaurant') // 載入 Restaurant

const bodyParser = require('body-parser')

const methodOverride = require('method-override') // 載入 method-override

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// require express-handlebars here
const exphbs = require('express-handlebars')
//require 
const restaurantList = require('./restaurant.json')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

//index page route setting
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log)
})

//search-bar route setting
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
    res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/new', (req, res) => {
    return res.render('new')
})

app.post('/restaurants', (req, res) => {
    const restaurant = req.body
    return Restaurant.create(restaurant)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => {
            restaurant = Object.assign(restaurant, req.body)
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//showpage route setting
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on local host: ${port} `)
})