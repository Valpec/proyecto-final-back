import NavBar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemDetailContainer from './components/ItemDetailContainer.js/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Register from './components/Register/Register';
import PurchaseDetails from './components/PurchaseDetails/PurchaseDetails';
import Profile from './components/Profile/Profile';
import AdminUsers from './components/AdminUsers/AdminUsers';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';


function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path='/' element={<ItemListContainer />} />
              <Route exact path='/products' element={<ItemListContainer />} />
              <Route exact path='/categoria/:categoriaId' element={<ItemListContainer greeting='Categoria: ' />} />
              <Route exact path='/item/:itemId' element={<ItemDetailContainer />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/admin-users' element={<AdminUsers />} />


              <Route path='/purchase-details' element={<PurchaseDetails/>} />
              <Route path='*' element={<h1>404 NOT FOUND</h1>} />

            </Routes>
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
