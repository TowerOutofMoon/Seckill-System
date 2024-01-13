// 引用SM4包进行加密
const SM4 = require("gm-crypt").sm4

// 密钥
const key = 'HENG1AN2WEN3YIN4'

// iv:initialVector 动态生成
// const iv = "1234567891011121"

// 对sm4加密方式进行配置
let sm4Config = {
    key: key, //后端传入
    // iv: iv, //动态生成
    mode: 'ecb', //ecb或cbc,如果是后者还需加入一个iv的参数
    cipherType: 'base64' //密码类型
};

const sm4 = new SM4(sm4Config)

export const encrypt = (text) => {
    console.log(sm4);
    return sm4.encrypt(text)
}

export const decrypt = (text) => {
    return sm4.decrypt(text)
}
