const router = require("express-promise-router")()
const multer = require('multer')
const storage = require("../middlewares/UploadFile")
const { imageFilter } = require('../utils/ImageFilter')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')
const userController = require('../controllers/UserController')
const { validatorBody, validatiorParams, baseSchema } = require("../validations/base")
const userSchemas = require("../validations/userSchema")


router.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), userController.profile)
// .post(passport.authenticate('jwt', { session: false }), multer({ storage: storage, fileFilter: imageFilter }).single('avatar'), userController.updateProfile)


router.route('/payments')
    .get(passport.authenticate('jwt', { session: false }), userController.paymentsMethod)
    .post(passport.authenticate('jwt', { session: false }), validatorBody(userSchemas.newPayment), userController.newPaymentMethod)

router.route('/payments/:paymentId')
    .put(passport.authenticate('jwt', { session: false }), validatiorParams(baseSchema.idSchema, "paymentId"), validatorBody(userSchemas.newPayment), userController.updatePaymentMethod)
    .delete(passport.authenticate('jwt', { session: false }), validatiorParams(baseSchema.idSchema, "paymentId"), userController.deletePaymentMethod)

router.route('/point')
    .post(passport.authenticate('jwt', { session: false }), validatorBody(userSchemas.addPoint), userController.addPointsMethod)

router.route('/coin')
    .post(passport.authenticate('jwt', { session: false }), validatorBody(userSchemas.changeCoin), userController.updateCoinMethod)

router.route('/coin-to-point')
    .post(passport.authenticate('jwt', { session: false }), validatorBody(userSchemas.changeCoin), userController.changeCoinToPointMethod)

router.route('/payment-history')
    .get(passport.authenticate('jwt', { session: false }), userController.paymentHistory)

router.route('/withdraw')
    .post(passport.authenticate('jwt', { session: false }), validatorBody(userSchemas.addPoint), userController.withdrawMethod)
module.exports = router