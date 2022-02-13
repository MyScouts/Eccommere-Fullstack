const authRouter = require('../routers/admin/authRouter')


// Compare this snippet from routers\admin\authRouter.js:
module.exports = (app) => {
    app.use('/api/admin/auth', authRouter)
}