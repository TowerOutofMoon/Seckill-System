// 前台验证
import validator from "validator";
import { isEmpty } from "lodash";

export const validatorInput = (data) => {
    const { username, password } = data
    let errors = {}
    if (validator.isEmpty(username)) {
        errors.username = '请输入用户名'
    }
    if (validator.isEmpty(password)) {
        errors.password = '请输入密码'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}