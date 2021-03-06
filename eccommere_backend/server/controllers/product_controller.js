const paginateHelper = require('../helpers/paginate_helper')
const ProductAttrModel = require('../models/product_attribute')
let ProductModel = require('../models/product_model')
let mongoose = require('mongoose')
const { converterServerToRealPath } = require('../helpers/converter_helper')
const CategoryModel = require('../models/category_model')
const generateSequence = require('../helpers/sequence_helper')
const { responseSuccess } = require('../common/reponseCommon')
const { PAGINATE_CONFIG } = require('../common/config')

let createProduct = async (req, res) => {
    let { productName, description, price, quantity, categoryIds } = req.body

    // categoryIds = categoryIds.split(',')
    // let categoryFind = await CategoryModel(mongoose.Types.ObjectId(categoryIds[0]))

    // if (categoryFind) {
    productId = await generateSequence('PR', 'MB')
    let newProduct = await ProductModel({
        productName: productName,
        quantity: quantity,
        // background: background,
        // avatar: avatar,
        price: price,
        // categories: categoryIds,
        description: description,
        productId: productId
    })
    console.log("🚀 ~ file: product_controller.js ~ line 29 ~ createProduct ~ req.files", req.files)
    if (req.files && req.files.length > 0) {
        newProduct.avatar = converterServerToRealPath(req.files[0].path ?? "");
        newProduct.background = converterServerToRealPath(req.files[1].path ?? "");
        // let background = converterServerToRealPath(req.files[1].path)
    }
    await newProduct.save()
    return responseSuccess(res, 200, "Create product is successfully!", { productId: newProduct.productId })

    // res.status(200).json({
    //     status: 200,
    //     success: true,
    //     message: "",
    //     data: newProduct
    // })

    // } else {
    //     res.status(400).json({
    //         status: 400,
    //         success: false,
    //         message: "",
    //         data: null
    //     })
    // }
}

let deleteProduct = async (req, res) => {
    await ProductModel.findOneAndRemove({ productId: req.params.productId })
    await ProductAttrModel.deleteMany({ productId: req.params.productId })
    res.status(200).json({
        status: 200,
        success: true,
        message: "",
        data: {
            productId: req.params.productId
        }
    })
}

let product = async (req, res) => {
    let products = await ProductModel.findOne({ productId: req.params.productId }).populate(['categories', 'attributes'])
    res.status(200).json({
        status: 200,
        success: true,
        message: "",
        data: products
    })
}

let products = async (req, res) => {
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : PAGE_SIZE
    let startIndex = (page - 1) * limit

    let condiction = {}

    // check search condiction
    if (req.query.search && req.query.search !== "undefined") {
        condiction = {
            $or: [
                { productName: { $regex: new RegExp(req.query.search, 'i') }, },
                { description: { $regex: new RegExp(req.query.search, 'i') }, },
                { 'categories.name': { $regex: new RegExp(req.query.search, 'i') }, },
            ]
        }
    }

    // let products = await paginateHelper(req, ProductModel, condiction, ['categories'], { productName: 0 })
    let productsQuery = ProductModel.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'categories',
                foreignField: '_id',
                as: 'categories'
            }
        }, {
            $lookup: {
                from: 'product_attrs',
                localField: 'attributes',
                foreignField: '_id',
                as: 'attributes'
            }
        }, {
            $match: condiction,
        }, {
            $project: {
                productName: 1,
                categories: 1,
                description: 1,
                attributes: 1,
                avatar: 1,
                price: 1,
                productId: 1,
                sale: 1,
                rating: 1,
                background: 1,
                quantity: 1,
                price: 1,
                createdAt: 1,
                updatedAt: 1,
                createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                updatedAt: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } }
            }
        }, {
            $addFields: {
                price: { $toString: "$price" }
            }
        },
    ])

    const products = await ProductModel.aggregatePaginate(productsQuery, PAGINATE_CONFIG(req.query.page, req.query.pageSize));

    return responseSuccess(res, 200, "Get products is successfully!", products)
}

let productAtributes = async (req, res) => {
    let productId = req.params.productId
    let attributes = await ProductModel.findById(mongoose.Types.ObjectId(productId)).populate('attributes').select('attributes')

    res.status(200).json({
        status: 200,
        success: true,
        message: "",
        data: attributes
    })
}


let updateAtrribute = async (req, res) => {
    let { attributeId } = req.params
    let { title, description } = req.body
    let attrbute = await ProductAttrModel.findById(mongoose.Types.ObjectId(attributeId))
    if (attrbute) {
        attrbute.title = title
        attrbute.description = description
        if (req.file) {
            attrbute.imageUrl = converterServerToRealPath(req.file.path)
        }
        await attrbute.save()
    }
    let product = await ProductModel.findOne({ productId: req.params.productId }).populate(['categories', 'attributes'])

    res.status(200).json({
        status: 200,
        success: true,
        message: "Update is successfully!",
        // data: product
    })
}


let addProductAttrbute = async (req, res) => {
    let { title, description } = req.body

    let attrbute = new ProductAttrModel({
        title: title,
        description: description,
        imageUrl: converterServerToRealPath(req.file.path)
    })

    let product = await ProductModel.findOne({ productId: req.params.productId })
    if (product) {
        product.attributes.push(attrbute._id)
        await product.save()
        await attrbute.save()
    }

    let resutl = await ProductModel.findOne({ productId: req.params.productId }).populate(['categories', 'attributes'])
    res.status(200).json({
        status: 200,
        success: true,
        message: "Create product is successfully!",
        // data: resutl
    })
}


let deleteAttrbuteProduct = async (req, res) => {
    let { productId, attributeId } = req.params
    let result = await ProductModel.updateOne(
        { productId: productId, attributes: { $in: [attributeId] } },
        { $pull: { attributes: { $in: [attributeId] } } })
    if (result.modifiedCount >= 1) {
        await ProductAttrModel.findByIdAndRemove(attributeId)
    }
    let product = await ProductModel.findOne({ productId: req.params.productId }).populate(['categories', 'attributes'])
    res.status(200).json({
        status: 200,
        success: true,
        message: "",
        // data: product
    })
}

let getProductAttibute = async (req, res) => {
    let { productId, attributeId } = req.params
    let product = await ProductModel.findOne({ productId: req.params.productId }).populate(['attributes']).select('attributes')
    res.status(200).json({
        status: 200,
        success: true,
        message: "",
        data: product
    })
}

const updateProduct = async (req, res) => {
    let { productId } = req.params
    let { productName, description, price, sale, rating, background, quantity, categories } = req.body
    let product = await ProductModel.findOne({ productId: productId })
    if (product) {
        product.productName = productName
        product.description = description
        product.price = price
        product.sale = sale
        product.rating = rating
        product.background = background
        product.quantity = quantity
        product.categories = categories

        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                if (file.fieldname === 'product_avatar') {
                    product.avatar = converterServerToRealPath(file.path)
                }
                else if (file.fieldname === 'product_background') {
                    product.background = converterServerToRealPath(file.path)
                }
            })
        }
        await product.save()
    }
    res.status(200).json({
        status: 200,
        success: true,
        message: "Update is successfully!",
        data: product
    })

}


module.exports = {
    products,
    product,
    productAtributes,
    createProduct,
    deleteProduct,
    updateAtrribute,
    addProductAttrbute,
    deleteAttrbuteProduct,
    getProductAttibute,
    updateProduct
}