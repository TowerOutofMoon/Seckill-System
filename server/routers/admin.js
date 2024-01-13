const express = require('express')
const router = express.Router()
const sqlFunc = require("../mysql")

router.get('/products', (req, res) => {
    var sql = "select * from `products`"
    sqlFunc(sql, null, (result) => {
        if (result.length > 0) {
            res.send({ result })
        }
        else {
            res.send({})
        }
    })
})

router.post('/products/add', (req, res) => {
    // console.log(req.body);
    const { key, name, originPrice, killPrice, count } = req.body
    const sql = "INSERT INTO `products` (`id`,`name`, `originPrice`, `salePrice`, `count`) VALUES (?,?,?,?,?)"
    const arr = [key, name, originPrice, killPrice, count]
    sqlFunc(sql, arr, (result) => {
        if (result) {
            res.send({ result })
        }
        else {
            res.send({})
        }
    })
})

router.post('/products/delete', (req, res) => {
    console.log(req.body);
    const { key } = req.body
    console.log(key);
    const sql = "DELETE FROM `products` WHERE `products`.`id` = ?"
    const arr = [key]
    sqlFunc(sql, arr, (result) => {
        if (result) {
            res.send({ result })
        }
        else {
            res.send({})
        }
    })
})

router.post('/products/update', (req, res) => {
    console.log(req.body);
    const { key, name, killPrice, count } = req.body
    console.log(key);
    const sql = "UPDATE `products` SET `name` = ? ,`salePrice` = ? ,`count` = ? WHERE `products`.`id` = ?;"
    const arr = [name, killPrice, count, key]
    sqlFunc(sql, arr, (result) => {
        console.log(sql);
        if (result) {
            console.log('成功了');
            res.send({ result })
        }
        else {
            res.send({})
        }
    })
})

router.get('/users', (req, res) => {
    var sql = "select * from `users`"
    sqlFunc(sql, null, (result) => {
        // console.log(result);
        if (result.length > 0) {
            res.send({ result })
        }
        else {
            res.send({})
        }
    })
})

router.post('/users/add', (req, res) => {
    // console.log(req.body);
    const { key, username, password, phoneNumber, identityNumber, accountNumber } = req.body
    const sql = "INSERT INTO `users` (`id`,`username`, `password`, `phoneNumber`, `identityNumber`, `accountNumber`) VALUES (?,?,?,?,?,?)"
    const arr = [key, username, password, phoneNumber, identityNumber, accountNumber]
    sqlFunc(sql, arr, (result) => {
        if (result) {
            res.send({ result })
        }
        else {
            res.send({})
        }
    })
})

router.post('/users/delete', (req, res) => {
    // console.log(req.body);
    const { key } = req.body
    // console.log(key);
    const sql = "DELETE FROM `users` WHERE `users`.`id` = ?"
    const arr = [key]
    sqlFunc(sql, arr, (result) => {
        if (result) {
            res.send({ result })
        }
        else {
            res.send({})
        }
    })
})


module.exports = router;