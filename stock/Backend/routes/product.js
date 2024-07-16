const express = require("express");
const router = express.Router();
const { createProduct, getProductById, addProduct, removeProduct, searchProduct ,getAllProducts} = require("../controllers/product");

router.post('/createproduct', createProduct);
router.get('/getproductbyid', getProductById);
router.post('/addproduct', addProduct);
router.delete('/removeproduct/:productId', removeProduct);
router.post('/searchproduct', searchProduct);
router.get('/getallproducts',getAllProducts);

module.exports = router;
