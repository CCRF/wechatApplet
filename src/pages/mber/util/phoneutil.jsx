import Taro from "@tarojs/taro";

export const checkPhone = (phoneNumberFromStorage) => {

    console.log("要检查的手机号：",phoneNumberFromStorage)
    const isBind = phoneNumberFromStorage === ""
    var phone = ""
    if (!isBind) {
        // 手机号预处理
        const phoneNumber = phoneNumberFromStorage
        const prePhoneNumber = phoneNumber.substring(0, 3)
        const afterPhoneNumber = phoneNumber.substring(phoneNumber.length - 4, phoneNumber.length)
        phone = prePhoneNumber + "******" + afterPhoneNumber
    } else {
        phone = "未绑定"
    }
    return phone
}