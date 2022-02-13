let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')

let Schema = mongoose.Schema

let userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    acccountType: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        maxlength: 10,
        minlength: 10,
        default: "",
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    sex: {
        type: String,
        default: "other"
    },
    birthDay: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: "",
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    pointTotal: {
        type: Number,
        default: 0
    },
    coinTotal: {
        type: Number,
        default: 0
    },
    ipLogin: {
        type: String,
        default: ""
    },
    logical_delete: {
        type: Date,
        default: null
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v
            delete ret.logical_delete
            return ret;
        },
    }
})

// custom server
// userSchema.pre('save', async function (next) {
//     try {
//         let salt = await bcrypt.genSalt(10)
//         let passwordHased = await bcrypt.hash(this.password, salt)
//         this.password = passwordHased
//         next()
//     } catch (error) {
//         next(error)
//     }
// })

// custom server
// userSchema.pre('findOneAndUpdate', async function (next) {
//     let update = { ...this.getUpdate() };
//     try {
//         if (update.password) {
//             let salt = await bcrypt.genSalt(10)
//             update.password = await bcrypt.hash(this.getUpdate().password, salt)
//             this.setUpdate(update);
//         }
//         next()
//     } catch (error) {
//         next(error)
//     }
// })


// userSchema.pre('find', async function (docs) {
//     this.populate('favorites')
// });

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error)
    }
};

// 
let UserModel = mongoose.model('users', userSchema)
module.exports = UserModel