const express = require("express");
const router = express.Router();
const cnotrollers = require('../controllers/products-controllers');
const{validationSchema}=require('../middleware/validation-schema');
router.route('/')
            .get(cnotrollers.getAllProducts)
            .post(validationSchema(),cnotrollers.addProduct);
            router.route('/:productId')
                    .get(cnotrollers.getSingleProduct)
                    .patch(cnotrollers.updateProduct)
                    .delete(cnotrollers.deleteProduct);

                    module.exports= router;

    