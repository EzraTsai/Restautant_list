// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const Restaurant = require('./models/restaurant') // 載入 Restaurant

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

//index page route setting
app.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .then(restaurants => res.render('index',{ restaurants }))
    .catch(error => console.log)
})

//search-bar route setting
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
    res.render('index', { restaurants: restaurants, keyword: keyword })
  })

//showpage route setting
app.get('/restaurants/:id', (req, res) => {
    // const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    // res.render('show', { restaurant: restaurant })
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