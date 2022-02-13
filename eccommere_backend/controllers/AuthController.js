const UserModel = require("../models/UserModel")
const { addDateWithNow } = require("../utils/DataTime")
let JWT = require('jsonwebtoken')
const { PASSPORT_SERECT } = require("../common/config")
let bcrypt = require('bcryptjs')



let encodeedToken = (userID, authen = true) => {
    return JWT.sign({
        iss: "MYPROJECT",
        sub: userID,
        iat: new Date().getTime(),
        exp: addDateWithNow(6)
    }, PASSPORT_SERECT)
}
// 
let register = async (req, res, next) => {
    let { firstName, lastName, email, password, phoneNumber, sex, address1, address2, birthDay } = req.value.body
    // check user is exsit
    condicion = []

    if (email) {
        let foundUser = await UserModel.findOne({ email })
        if (foundUser) return res.status(200).json({
            message: "Email is exists!",
            success: false,
            status: 301
        })
    }

    if (phoneNumber) {
        let foundUser = await UserModel.findOne({ phoneNumber })
        if (foundUser) return res.status(200).json({
            message: "Phone Number is exists!",
            success: false,
            status: 302
        })
    }
    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    let newUser = await new UserModel({ firstName, lastName, email, password, phoneNumber, sex, address1, address2, birthDay })
    await newUser.save()

    let token = encodeedToken(newUser._id)
    return res.status(200).json({
        success: true,
        status: 200,
        data: {
            successToken: token,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }
    })
}

// 
let loginMethod = async (req, res) => {
    let { email, password } = req.value.body
    let user = await UserModel.findOne({ email: email })
    if (user) {
        let checkMatchPassword = await user.comparePassword(password);
        if (checkMatchPassword) {
            token = encodeedToken(user._id)
            return res.status(200).json({
                status: 200,
                message: "",
                success: true,
                data: {
                    successToken: token,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
        } else {
            return res.status(301).json({
                status: 301,
                message: "password not match!",
                success: false,
            })
        }
    }
    return res.status(400).json({
        status: 400,
        message: "Not found user!",
        success: false,
    })

}



module.exports = {
    register,
    loginMethod
}