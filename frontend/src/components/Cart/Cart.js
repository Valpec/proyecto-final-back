import './Cart.css';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

const Cart = () => {
  const { cart, clearCartItems, handlePurchase, fetchCart, ticket } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (ticket) {
      navigate('/purchase-details');
    }
  }, [ticket, navigate]);
  
  if (!cart || cart.length === 0) {
    return (
      <div className='cartVacio footerCart'>
        <h1>No hay items en el carrito</h1>
        <Link to='/' className="botonCompra">Productos</Link>
      </div>
    );
  }

  return (
    <div>
      {cart.map(item => (
        <CartItem key={item.product._id} product={item.product} quantity={item.quantity} />
      ))}
      <div className='footerCart'>
        <h3>Total: ${cart.reduce((total, item) => total + item.product.price * item.quantity, 0)}</h3>
        <button onClick={handlePurchase} className="terminarCompra botonCompra">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
