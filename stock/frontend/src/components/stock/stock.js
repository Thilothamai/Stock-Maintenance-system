import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './stock.css';
import Sidebarmenu from '../sidebar';
import { fetchStocks, updateStockQuantity, createStock, deleteStock } from '../../Backend'; // Import fetchProducts from Backend
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import { PDFViewer } from '@react-pdf/renderer'; // PDFViewer is used
import ReportPDF from '../report/stockreport';

const Stock = () => {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [createError, setCreateError] = useState(''); // State to control visibility of report
    const [newStock, setNewStock] = useState({
        productId: '',
        quantity: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const stockList = await fetchStocks();
            setStocks(stockList);
            setError('');
        } catch (error) {
            setStocks([]);
            setError('Error fetching stocks');
        }
    };

    const navigateTo = (path) => {
        window.location.href = path;
    };

    const handleUpdateStock = async (productId, action) => {
        try {
            const quantityInput = document.getElementById(`quantity-${productId}`);
            const quantity = parseInt(quantityInput.value);
            await updateStockQuantity({ productId, quantity, action });
            fetchData();
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const handlePreview = () => {
        const pdfWindow = window.open('', '_blank');
        pdfWindow.document.write('<!DOCTYPE html><html><head><title>Product Preview</title></head><body></body></html>');
        ReactDOM.render(
            <PDFViewer style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
                <ReportPDF stockList={stocks} />
            </PDFViewer>,
            pdfWindow.document.body
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStock({
            ...newStock,
            [name]: value
        });
    };

    const handleCreateStock = async () => {
        try {
            await createStock(newStock);
            setNewStock({
                productId: '',
                quantity: 0
            });
            setCreateError(''); // Reset the create error if successful
            fetchData();
        } catch (error) {
            console.error('Error creating stock:', error);
            setCreateError(error.response.data.error); // Set the error message from the response
        }
    };

    const handleDeleteStock = async (productId) => {
        try {
            await deleteStock(productId);
            fetchData();
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    return (
        <div>
            <div className='sidebar'>
                <Sidebarmenu onMenuClick={navigateTo}/>
            </div>

            <div className='stock'>
                <div className='heading'>
                    <h1>Stock Details</h1>
                    <button className="stock-preview-button" onClick={handlePreview}>
                        Report
                    </button>
                </div>
                <div className="stock-create-form">
                    <input
                        type="text"
                        placeholder="Product ID"
                        name="productId"
                        value={newStock.productId}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        value={newStock.quantity}
                        onChange={handleChange}
                    />
                    <button onClick={handleCreateStock}>Create Stock</button>
                    
    {createError && <p className="error-message">{createError}</p>}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Last Updated</th>
                            <th>Update Stock</th>
                            <th>Delete Stock</th> {/* New column for the delete option */}
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr key={stock.productId}>
                                <td>{stock.productId}</td>
                                <td>{stock.name}</td>
                                <td>{stock.quantity}</td>
                                <td>{stock.lastUpdated}</td>
                                <td>
                                    <input type="number" id={`quantity-${stock.productId}`} defaultValue="1" min="1" />
                                    <AddBoxIcon className='icon' width='auto'onClick={() => handleUpdateStock(stock.productId, 'increase')} />
                                    <IndeterminateCheckBoxIcon className='icon' onClick={() => handleUpdateStock(stock.productId, 'decrease')} />
                                </td>
                                <td>
                                    <DeleteIcon className='icon' onClick={() => handleDeleteStock(stock.productId)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stock;
