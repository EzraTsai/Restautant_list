const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
    const userId = req.user._id
    Restaurant.find({ userId })
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

//search-bar route setting
router.get('/search', (req, res) => {
    // const keyword = req.query.keyword
    // const restaurants = restaurantList.results.filter(restaurant => {
    //     return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    // })
    // res.render('index', { restaurants, keyword })
    const userId = req.user._id
    const keyword = req.query.keyword
    Restaurant.find({ name: { $regex: keyword, $options: "i" }, userId })
        .lean()
        .sort({ name: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

module.exports = router