const authRouter = require('./authRouters')
const userRouter = require('./UserRouter')

module.exports = (app) => {
    app.use("/api/auth", authRouter)
    app.use("/api/user", userRouter)
}