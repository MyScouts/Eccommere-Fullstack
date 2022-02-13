const mongooseClient = require('mongoose')

module.exports = DBConnection = async () => {
    const MONGO_URL = 'mongodb://localhost:27017/blogs?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
    try {
        await mongooseClient.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        })
        console.log("Mongoose connection is successfull!")
    } catch (error) {
        console.log("🚀 ~ file: app_database.js ~ line 9 ~ DBConnection ~ error", error)
    }
}