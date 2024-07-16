const express = require("express");
const router = express.Router();
const { getStockByProductId, updateStockQuantity, createStock,getAllStocks,deleteStock } = require("../controllers/stock");

// Route to get stock by productId
router.get('/getstockbyproductId', getStockByProductId);

// Route to update stock quantity by productId
router.post('/updatestockbyproductid', updateStockQuantity);

// Route to create new stock
router.post('/createstock', createStock);
router.get('/getallstock',getAllStocks);
router.delete('/deletestock/:productId',deleteStock);

module.exports = router;
