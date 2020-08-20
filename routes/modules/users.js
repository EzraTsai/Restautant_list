const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))
// 登錄的提示
// router.post("/login", (req, res, next) => {
//     let { email, password } = req.body
//     let errors = []
//     if (!email || !password) {
//         req.flash('warning_msg', '欄位皆為必填。')
//         return res.redirect('/users/login')
//     }
//     passport.authenticate ('local', function (err, user, info) {
//         req.logIn(user, (err) => {
//             console.log(info.message)
//             console.log(user)
//             if (err) { 
//                 if(info.message === "user"){
//                     errors.push({message: "找不到使用者"});
//                 }else{
//                     errors.push({message: "密碼錯誤"});
//                 }
//                 return res.render("login", { email, errors });
//             }
//             return res.redirect('/')
//         })
//     })(req, res, next)
// })

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    // 取得註冊表單參數
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!email || !password || !confirmPassword) {
        errors.push({ message: '有必填欄位未填寫' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
        return res.render('register', { errors, name, email, password, confirmPassword })
    }
    // 檢查使用者是否已經註冊
    User.findOne({ email }).then(user => {
        // 如果已經註冊：退回原本畫面
        if (user) {
            errors.push({ message: '這個 Email 已經註冊過了。' })
            return res.render('register', { errors, name, email, password, confirmPassword })
        }
        // 如果還沒註冊：寫入資料庫
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
                name, email, password: hash
            }))
            .then(() => res.redirect('/users/login'))
            .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

module.exports = router