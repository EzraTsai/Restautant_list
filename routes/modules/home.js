const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const restaurantList = require('../../restaurant.json')

router.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log)
})

//search-bar route setting
router.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
    res.render('index', { restaurants, keyword })
})

module.exports = router