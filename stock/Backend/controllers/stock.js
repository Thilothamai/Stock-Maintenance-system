const Stock = require('../models/stock');
const Product = require('../models/product');

// Controller function to create new stock
exports.createStock = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Check if the product exists
        const existingProduct = await Product.findOne({ productId });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const { name } = existingProduct; // Fetch product name

        // Create or update stock entry
        let stock = await Stock.findOne({ productId });

        if (!stock) {
            stock = new Stock({
                productId,
                name, // Include product name
                quantity
            });
        } else {
            stock.quantity += quantity;
        }

        // Save the stock entry
        await stock.save();

        res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to get stock by productId
exports.getStockByProductId = async (req, res) => {
    try {
        const { productId } = req.body; // Extract productId from request parameters

        // Find the stock entry by productId
        const stock = await Stock.findOne({ productId });
        const product = await Product.findOne({ productId });
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found for the provided productId' });
        }

        // Send response with stock details
        res.status(200).json({ 
            productId: stock.productId,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: stock.quantity,
            lastUpdated: stock.lastUpdated
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to update stock quantity by productId
exports.updateStockQuantity = async (req, res) => {
    try {
        const { productId, quantity, action } = req.body;

        // Check if action is provided and is valid
        if (!action || (action !== 'increase' && action !== 'decrease')) {
            return res.status(400).json({ error: 'Invalid action. Provide either "increase" or "decrease".' });
        }

        const stock = await Stock.findOne({ productId });
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        // Update stock quantity based on the action
        if (action === 'increase') {
            stock.quantity += quantity; 
        } else if (action === 'decrease') {
            // Check if the decrease quantity is greater than the current stock quantity
            if (quantity > stock.quantity) {
                return res.status(400).json({ error: 'Cannot decrease stock quantity. Insufficient quantity available.' });
            }
            stock.quantity -= quantity; 
        }

        stock.lastUpdated = Date.now();
        await stock.save();
        res.json(stock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controller function to get all available stocks
exports.getAllStocks = async (req, res) => {
    try {
        // Find all stock entries
        const stocks = await Stock.find();

        // Send response with stock details
        res.status(200).json(stocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to delete stock by productId
exports.deleteStock = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the stock entry by productId and delete it
        const deletedStock = await Stock.findOneAndDelete({ productId });

        if (!deletedStock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        res.status(200).json({ message: 'Stock deleted successfully', deletedStock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
