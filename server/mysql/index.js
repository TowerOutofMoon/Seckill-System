const mysql = require("mysql");

var client = mysql.createConnection({
    host:"localhost",
    user:"root",//默认
    password:"",//空
    database:"secondkill"
})

function sqlFunc(sql,arr,callback) {
    /**
     * 接收三个参数：
     * sql语句
     * sql语句的参数
     * 回调函数返回值
     */
    client.query(sql,arr,function(error,result) {
        if (error) {
            console.log(error);
            return;
        }
        callback(result)
    })
}

module.exports = sqlFunc
