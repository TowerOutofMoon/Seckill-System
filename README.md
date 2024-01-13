### 登陆注册系统
1.登录
2.注册
3.验证

## 知识点
1.Redux

配置store,reducer,并在入口文件src/index.js中引入

2.安装命令
```
npm i xx -g: npm install xx --global 全局安装,把模块安装到操作系统上
npm i xx -D: npm install xx --save-dev 安装的xx不随打包上线
npm i xx -S: npm install xx --save 安装的xx随打包上线
```

## 环境搭建
1.安装依赖
```
npm install --save react-redux redux redux-thunk
npm install --save-dev redux-devtools-extension redux-logger
```
2.搭建服务器
```
npm install --save express
npm install --save nodemon
```
通过使用nodemon对node服务器进行自动重启

## 配置路由
1.在routers文件夹中配置路由
2.在入口文件中引入routers

## 注册页面编辑
    组件分类：
        智能组件：具有业务逻辑，处理数据
        木偶组件：数据的呈现，UI展示
    表单的使用场景：
        所有具有输入的位置，都需要表单
    表单数据的获取：
        受控组件：input的值被state所控制
        非受控组件：获取DOM，通过DOM读取数据

## 网络请求处理数据
    axios网络请求
    npm install --save axios

## 后台验证
    处理跨域问题
    npm install --save-dev http-proxy-middleware
    setupProxy.js配置文件，千万不能写注释，会导致文件失效！
    lodash资源库：是一个一致性、模块化、高性能的JS使用工具库。
    npm install --save lodash

## 前台对验证结果的展示
    动态处理class,引入一个第三方的class处理方案
    npm install --save classnames
    节流防抖操作

## 注册验证成功回到首页
    react-router-dom-v6以后withRouter已被弃用，需要手动封装才能在类组件中使用
    封装文件:withRouter.js
    使用navigate('/')进行跳转
    界面提示：flashMessageList组件

## 连接数据库
    npm install --save mysql

## 注册校验
    正则表达式:
    reg = /^(?![0-9]+$)(?![a-z][A-Z]+$)[0-9a-zA-Z]{6,18}$/; //密码
    reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; //手机号
    
## 登录认证
    后台+前台校验

## JWT
    参考地址:http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
    加密:MD5 sha1
    生成token:用于验证加密
    npm install --save jsonwebtoken
    使用sign(payload,privateSecret,[extra])生成token

## 解析token
    npm install --save jwt-decode
    参考地址:https://github.com/auth0/jwt-decode
