let router = require('express-promise-router')()
const authSchemas = require('../../validations/authSchemas')
const { validatorBody } = require('../../validations/base')
const authController = require('../../controllers/admin/authController')
//


router.route('/login')
    .post(validatorBody(authSchemas.signIn), authController.adminLogin)


module.exports = router