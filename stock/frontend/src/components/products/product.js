import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './product.css';
import Sidebarmenu from '../sidebar';
import { fetchProducts, deleteProduct, addProduct, searchProducts } from '../../Backend';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from '../report/productreport';

const Products = () => {
    const navigateTo = (path) => {
        // Use the Navigate component to navigate programmatically
        window.location.href = path;
    };


    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newProduct, setNewProduct] = useState({
        productId: '',
        name: '',
        description: '',
        price: ''
    });
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productList = await fetchProducts();
            setProducts(productList);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            const updatedProductList = products.filter(product => product.productId !== productId);
            setProducts(updatedProductList);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    const handleAddProduct = async () => {
        try {
            await addProduct(newProduct);
            fetchData();
            setNewProduct({
                productId: '',
                name: '',
                description: '',
                price: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };
    
    const handleSearch = async () => {
        try {
            if (searchQuery.trim() !== '') {
                const searchResult = await searchProducts(searchQuery);
                setProducts(searchResult);
            } else {
                fetchData();
            }
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handlePreview = () => {
        const pdfWindow = window.open('', '_blank');
        pdfWindow.document.write('<!DOCTYPE html><html><head><title>Product Preview</title></head><body></body></html>');
        ReactDOM.render(
            <PDFViewer style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
                <ReportPDF productList={products} />
            </PDFViewer>,
            pdfWindow.document.body
        );
    };
    

    return (
        <div>
            <div className='sidebar'>
               
            <Sidebarmenu onMenuClick={navigateTo}/>
            </div>
            <div className='product'> 
                <div>
                    <h1>Product List</h1>
                    <div className='product-form'>
                        <input
                            type="text"
                            placeholder="Product ID"
                            value={newProduct.productId}
                            name="productId"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newProduct.description}
                            name="description"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={newProduct.price}
                            name="price"
                            onChange={handleInputChange}
                        />
                        <AddCircleIcon fontSize="large" onClick={handleAddProduct}/>
                        
                        
                    </div>
                    
                    <div className="button-container">
                    <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            
                        />
                        <SearchOutlined onClick={handleSearch}/>
                        <button className="product-preview-button" onClick={handlePreview}>
                        Report
                      </button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>Rs.{product.price}</td>
                                    <td>
                                        <DeleteIcon onClick={() => handleDelete(product.productId)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
};

export default Products;
