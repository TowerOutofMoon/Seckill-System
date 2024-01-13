//配置路由

const express = require('express');
const router = express.Router();
const isEmpty = require("lodash/isEmpty");
const { nanoid } = require('nanoid');
const validator = require("validator");
const sqlFunc = require("../mysql")

//验证方法
const validatorInput = (data) => {
    console.log(data);
    let errors = {};
    //空值判断
    if (validator.isEmpty(data.username)) {
        errors.username = "请填写用户名"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "请填写密码"
    }
    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "请再次输入密码"
    }
    if (validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "请填写手机号"
    }
    if (validator.isEmpty(data.identityNumber)) {
        errors.identityNumber = "请填写身份证"
    }
    if (validator.isEmpty(data.cardNumber)) {
        errors.cardNumber = "请填写银行账户"
    }
    //用户名长度必须大于2小于15
    if (!validator.isLength(data.username, { min: 2, max: 15 })) {
        errors.username = "名字的长度应在2-15之间";
    }
    //密码长度必须大于6小于18
    if (!validator.isLength(data.password, { min: 6, max: 18 })) {
        errors.password = "密码的长度应在6-18之间";
    }
    //密码和重新输入密码必须一致
    if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "两次密码输入不一致";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

//get方法
router.get('/:username', (req, res) => {
    var sql = "select * from `users` where `username` =?";
    var arr = [req.params.username] //获取传入的user
    // console.log(arr);
    sqlFunc(sql, arr, (result) => {
        if (result) {
            res.send({ result })
        }
        else {
            res.send({}) //返回空对象
        }
    })
})

router.get('/', (req, res) => {
    // console.log('执行了此方法');
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

//post方法
router.post('/', (req, res) => {
    const userData = req.body;
    userData.id = nanoid()
    console.log(userData);
    const { errors, isValid } = validatorInput(userData);
    if (!isValid) {
        res.status(400).json(errors);
    } else {
        const sql = "insert into users values (?,?,?,?,?,?)";
        const arr = [userData.id, userData.username, userData.password, userData.phoneNumber, userData.identityNumber, userData.cardNumber]

        sqlFunc(sql, arr, result => {
            if (result.affectedRows) {
                res.status(200).json({
                    msg: true
                })
            }
            else {
                res.status(400).json({
                    msg: "注册失败"
                });
            }
        })

    }
})

router.post('/order', (req, res) => {
    const { city, number, id } = req.body
    // 让库存数减少1
    const sql = 'UPDATE `products` SET `count`= (`count` - ?) where `products`.`id` = ?'
    const arr = [number, id]
    sqlFunc(sql, arr, (result) => {
        if (result) {
            res.send({ result })
        }
        else {
            res.status(200).send({})
        }
    })
})

module.exports = router;