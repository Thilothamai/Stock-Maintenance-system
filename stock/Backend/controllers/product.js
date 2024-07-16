const Product = require('../models/product');
const Stock = require('../models/stock');

exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params; // Use req.params for productId
        const stock = await Stock.findOne({ productId });
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found for the provided productId' });
        }
        res.status(200).json({ 
            productId: product.productId,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: stock ? stock.quantity : 0,
            lastUpdated: stock ? stock.lastUpdated : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.removeProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOneAndDelete({ productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchProduct = async (req, res) => {
    try {
        const keyword = req.body.keyword; // Extract keyword from request body
        const products = await Product.find({ 
            $or: [
                { name: { $regex: keyword, $options: 'i' } }, 
                { description: { $regex: keyword, $options: 'i' } }
            ] 
        });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
