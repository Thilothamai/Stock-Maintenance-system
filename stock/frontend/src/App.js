import './App.css';
import Signin from './components/signinPage/signin.js'
import Signup from './components/signupPage/signup.js';
import Dashboard from './components/dashboard/dashboard.js';
import ForgotPassword from './components/signinPage/forgotpassword.js';
import Products from './components/products/product.js';
import Stock from './components/stock/stock.js';
import {Routes, Route, BrowserRouter as Router,Navigate} from 'react-router-dom';


function App() {
  
  
  return (

    <div className='App' >
      
          
      <Router>
        <Routes>
          <Route exact path='/' element={<Dashboard/>} />
          <Route exact path="/signin" element={<Signin/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path = '/forgotpassword' element={<ForgotPassword/>}/>
          <Route exact path = '/products' element={<Products/>}/>
          <Route exact path = '/stock' element={<Stock/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;