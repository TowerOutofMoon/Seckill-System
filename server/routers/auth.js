const express = require('express');
const router = express.Router();
const sqlFunc = require("../mysql")
const jwt = require("jsonwebtoken")
const config = require("../../server/config")

// post方法
router.post("/", (req, res) => {
    const { username, password } = req.body
    var sql = "select * from `users` where `username` = ? and `password` = ?"
    var arr = [username, password]
    sqlFunc(sql, arr, (result) => {
        if (result.length > 0) {
            console.log(result[0]);
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username,
                password: result[0].password,
                account_number: result[0].accountNumber,
                phone_number: result[0].phoneNumber,
                identity_nunmber: result[0].identityNunmber
            }, config.jwtSecret)
            res.send(token)
            /**
             * console.log(result);
             * [
                RowDataPacket {
                    id: 1,
                    username: 'admin',
                    password: 'suxiqingshi2b..',
                    accountNumber: '15850696039',
                    phoneNumber: '431021200208050015',
                    identityNumber: '2006010408'
                }
            ]
            */
        }
        else {
            res.status(400).json({
                errors: "用户名或密码输入错误"
            })
        }
    })
})

// 
module.exports = router;