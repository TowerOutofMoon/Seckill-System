import validator from "validator";
import { isEmpty } from "lodash";

//验证方法
export const validatorInput = (data) => {
    // console.log(data);
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