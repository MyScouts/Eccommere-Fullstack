const express = require('express');
const app = express();
const DBConnect = require('./common/database');
const bodyParser = require('body-parser');
const { PORT } = require('./common/config');
var cors = require('cors')

const userRouter = require('./routers/userIndex');
const adminRouter = require('./routers/adminIndex');
DBConnect();
app.use(cors(
    {
        origin: 'http://localhost:3000',
    }
))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());
app.use('/uploads', express.static('./uploads'));
userRouter(app);
adminRouter(app);

// Catch 404 Errors and forward them to error controller
app.use((req, res, next) => {
    let err = new Error("Not Found!")
    err.status = 404
    next(err)
})

// error handle function    
app.use((err, req, res, next) => {
    let error = app.get('env') === 'development' ? err : ""
    let status = err.status || 500
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})