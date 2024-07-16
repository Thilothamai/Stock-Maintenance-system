import axios from 'axios';

//USER AND AUTH ROUTES

//SIGNIN
export const signin = user => {
    // API call to sign in a user
    return axios.post("http://localhost:8000/api/signin", JSON.stringify(user), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.data; // Return response data
    })
    .catch(err => {
        return err.response.data; // Return error response data
    })
}

//SIGNUP
export const signup = user => {
    // API call to sign up a user
    return axios.post("http://localhost:8000/api/signup", JSON.stringify(user),{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log(response.data);
        return response.data; // Return response data
    })
    .catch(err => {
        return err.response.data; // Return error response data
    })
}

//SETTING THE JWT TOKEN IN USER'S BROWSER
export const authenticate = (data, next) => {
    // Storing JWT token in user's browser
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

//SIGNOUT -> REMOVING JWT TOKEN
export const signout = (next) => {
    // Removing JWT token upon signout
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");

        axios.get("http://localhost:8000/api/signout")
        .then(response => {
            console.log(response.data); 
            next(); 
        })
        .catch(err => console.log(err));
    }
};

//VALIDATION IF USER IS SIGNED IN
export const isAuthenticated = () => {
    // Checking if the user is authenticated
    if (typeof window === "undefined") {
        return false
    }
    if(localStorage.getItem("jwt"))
        return JSON.parse(localStorage.getItem("jwt"));
    else
        return false
}


//FORGOT PASSWORD
export const forgotPassword = email => {
    // API call to request a password reset email
    return axios.post("http://localhost:8000/api/forgotpassword", JSON.stringify({ email }), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.data; // Return response data
    })
    .catch(err => {
        return err.response.data; // Return error response data
    })
}
// Frontend code to reset the password
const resetPassword = async (resetToken, newPassword) => {
    try {
        const response = await axios.post("http://localhost:8000/api/resetpassword", {
            resetToken,
            newPassword,
        });

        console.log(response.data.message); // Password reset successful
        // Display success message to the user
    } catch (error) {
        console.error("Error resetting password:", error);
        // Display error message to the user
    }
};


//product functions
export const fetchProducts = () => {
    return axios.get("http://localhost:8000/api/getallproducts")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            return [];
        });
};


export const addProduct = (productData) => {
    return axios.post("http://localhost:8000/api/addproduct", productData)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error adding product:", error);
            return null;
        });
};

export const deleteProduct = (productId) => {
    return axios.delete(`http://localhost:8000/api/removeproduct/${productId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting product:", error);
            return null;
        });
};

export const searchProducts = (keyword) => {
    return axios.post("http://localhost:8000/api/searchproduct", { keyword })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error("Error searching products:", error);
        return [];
    });
};


//Stock functions
export const createStock = (stockData) => {
    return axios.post("http://localhost:8000/api/createstock", JSON.stringify(stockData), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return error.response.data;
    });
};

export const getStockByProductId = (productId) => {
    return axios.get("http://localhost:8000/api/getstockbyproductId",JSON.stringify(productId), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return error.response.data;
    });
};

export const updateStockQuantity = (stockData) => {
    return axios.post("http://localhost:8000/api/updatestockbyproductid", JSON.stringify(stockData), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return error.response.data;
    });
};
export const fetchStocks = () => {
    return axios.get("http://localhost:8000/api/getallstock")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching stocks:", error);
            return [];
        });
};

export const deleteStock = (productId) => {
    return axios.delete(`http://localhost:8000/api/deletestock/${productId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting stock:", error);
            return null;
        });
};