const JWT = require('jsonwebtoken')
const { PASSPORT_SERECT } = require("../../common/config");
const UserModel = require("../../models/UserModel");
const { addDateWithNow } = require("../../utils/DataTime");
const { successResponse } = require('../../utils/responseUtils');



let encodeedToken = (userID, authen = true) => {
    return JWT.sign({
        iss: "MYPROJECT",
        sub: userID,
        iat: new Date().getTime(),
        exp: addDateWithNow(6)
    }, PASSPORT_SERECT)
}

const adminLogin = async (req, res) => {
    // 200: success - 301: password is wrong - 302:Account is deleted -  303: Account is not admin - 400: Email is not exists 
    const { email, password } = req.value.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
        const checkMatchPassword = await user.comparePassword(password);
        if (checkMatchPassword) {
            if (user.logical_delete) {
                return successResponse(res, 302, "Account is deleted")
            }
            token = encodeedToken(user._id)
            var statusCode = 200;
            if (user.acccountType === 'admin') {
                statusCode = 201;
            }
            return successResponse(res, statusCode, "Login is successfully!", {
                successToken: token,
                firstName: user.firstName,
                lastName: user.lastName,
                accountType: user.acccountType,
            })
        } else {
            return successResponse(res, 301, "Password is wrong!")
        }
    }
    return successResponse(res, 400, "Email is not exists!")
}

module.exports = {
    adminLogin
}
