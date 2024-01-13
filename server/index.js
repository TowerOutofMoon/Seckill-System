const express = require('express');
const app = express();
const debug = require('debug')('my-application')
const bodyParser = require('body-parser') //处理post请求

const users = require('./routers/user');
const auth = require('./routers/auth')
const admin = require('./routers/admin')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/users',users);
app.use('/auth',auth);
app.use('/admin',admin);


app.listen(3050,()=>{
    console.log('服务器端口:3050');
})


