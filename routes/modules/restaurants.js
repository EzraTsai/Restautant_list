const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user._id
    console.log(userId)
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    // const restaurant = req.body
    // console.log(restaurant)
    return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    // return Restaurant.create(restaurant, { userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
        .then(restaurant => {
            restaurant = Object.assign(restaurant, req.body)
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

module.exports = router