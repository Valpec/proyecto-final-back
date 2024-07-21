import './CartItem.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ product, quantity }) => {
  const { removeItemFromCart, updateItemQty } = useContext(CartContext);
    console.log(product, 'el enviado en cartitem')
  return (
    <div className='itemCarrito'>
      <img src={`../img/productos/${product.thumbnail}`} alt={product.title} className='imgItem' />
      <div className="zonaTexto">
        <h3 className='nomItem'>{product.title}</h3>
        <h6 className="catItemDetail">{product.category}</h6>
      </div>
      <h6 className="precioItem">Cantidad: {quantity}</h6>
      <div className='zonaPrecio'>
        <h6 className="precioItem">Precio Unitario: ${product.price}</h6>
        <h4 className='subtotalItem'>Subtotal: ${product.price * quantity}</h4>
      </div>
      <button className='botonRemove' onClick={() => removeItemFromCart(product._id)}>
        <img src='../img/icons/trash_can.png' />
      </button>
      {/* <div>
        <input type="number" value={quantity} onChange={(e) => updateItemQty(product._id, parseInt(e.target.value))} />
      </div> */}
    </div>
  );
};

export default CartItem;
