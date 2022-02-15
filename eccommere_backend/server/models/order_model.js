let mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

let orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        enum: [0, 1, 2, 3],
        // 0: Đang chờ xử lý
        // 1: Đang giao hàng
        // 2: Đã giao hàng
        // 3: Đã hủy
        default: 0,
    },
    acceptTime: {
        type: Date,
        default: null,
    },
    orderTime: {
        type: Date,
        default: null,
    },
    method: {
        type: Number,
        enum: [0, 1],
        // 0: Thanh toán khi nhận hàng
        // 1: Thanh toán online
        default: 0,
    }
}, {
    timestamps: true
})
orderSchema.plugin(aggregatePaginate);
let OrderModel = mongoose.model('orders', orderSchema);
module.exports = OrderModel;