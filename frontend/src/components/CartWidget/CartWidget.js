import { useContext } from 'react';
import cartIcon from '../assets/cart.svg';
import './CartWidget.css';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
  const { cart } = useContext(CartContext);
//   const cartQuantity = cart.reduce((total, p) => total + p.quantity, 0);

  return (
    <div className='carritoNavbar'>
      <img src={cartIcon} alt='Cart Widget' />
      {/* <span id="cantProdsCarrito" style={{ display: cartQuantity > 0 ? 'block' : 'none' }}>{cartQuantity}</span> */}
    </div>
  );
};

export default CartWidget;
