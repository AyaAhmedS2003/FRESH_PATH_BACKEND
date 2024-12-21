const Product = require('../models/products-model');
const {validationResult } = require("express-validator");
const httpStatus =require('../utils/http-status-handler');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');
//add edit delete update for all schema

const getAllProducts=asyncWrapper(async(req, res) => {
    const query = req.query
    const limit =query.limit||10;
    const page = query.page||1;
    const skip = (page-1)*limit;
    const products = await Product.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status:httpStatus.SUCCESS,data:{products}});
})

const getSingleProduct=asyncWrapper(
async (req, res,next) => {
    
    const product =  await Product.findById(req.params.productId); 
    if (!product) {
       const error =  appError.create('product not found', 404, httpStatusText);
        return next(error);
    }
    return res.json({status :httpStatus.SUCCESS,data:{product}});

})
const updateProduct =asyncWrapper(async(req,res)=>{
    const productId = req.params.productId;

    const updatedProduct =  await Product.findByIdAndUpdate(productId,{$set:{...req.body}})
     return res.status(200).json({status:httpStatus.SUCCESS,data:{updatedProduct}});
    
    
})
let deleteProduct =asyncWrapper (async(req,res)=>{
    const productId = req.params.productId;
    await Product.deleteOne({_id:productId});
    res.status(200).json({status:httpStatus.SUCCESS,data:null})
})
const addProduct = asyncWrapper(async(req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = appError.create(errors.array(),400,httpStatusText.FAIL)
        return next(error) 
    }
        const newProduct = new Product(req.body);
            await newProduct.save();
        res.status(201).json({status:httpStatus.SUCCESS,data:{Product:newProduct}}); 
})
    
module.exports = {
    getAllProducts,getSingleProduct,updateProduct,deleteProduct,addProduct
}
