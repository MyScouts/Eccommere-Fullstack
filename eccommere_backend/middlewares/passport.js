let passport = require('passport')
let JwtStrategy = require('passport-jwt').Strategy
let LocalStrategy = require('passport-local').Strategy
let { ExtractJwt } = require('passport-jwt')
const { PASSPORT_SERECT } = require('../common/config')
const UserModel = require('../models/UserModel')
// 

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: PASSPORT_SERECT
}, async (payload, done) => {
    try {
        let user = await UserModel.findById(payload.sub, { password: 0, __v: 0 })
        if (!user) return done(null, false)

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))
// passport localStrategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await UserModel.findOne({ email })
        if (!user) return done(null, false)
        let isCorrectPassword = await user.comparePassword(password)
        if (!isCorrectPassword) return done(null, false)

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))