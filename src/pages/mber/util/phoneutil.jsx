import Taro from "@tarojs/taro";

//手机号处理
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

// 需添加卡券信息处理
export const addVoucher = (raiItem) => {
    // 获取当前时间
    const dated = dealWithDate()
    // 卡券信息整理
    const card = {
        voucherId: "null",
        openId: Taro.getStorageSync("personalInfo").openId,
        voucherName: raiItem.name,
        voucherDated: dated,
        voucherUrl: "../../.." + raiItem.img,
        voucherType: raiItem.name,
        voucherRai: raiItem.voucherRai,
        voucherLimit: raiItem.goodsList
    }
    return card
}

export const dealWithDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const Hours = date.getHours()
    const minutes = date.getMinutes()
    const second = date.getSeconds()
    const dated = year + "-" + month + "-" + day + " " + Hours + ":" + minutes + ":" + second
    console.log("卡券过期时间",dated)
    return dated
}