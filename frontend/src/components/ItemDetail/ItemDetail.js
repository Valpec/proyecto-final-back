import { useContext, useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import './ItemDetail.css';
import { CartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom';

const ItemDetail = ({ _id, category, title, price, thumbnail, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);

  const { addItemToCart } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);

    const item = {
      _id, category, title, price, thumbnail, stock
    };
    addItemToCart(_id);

  };

  return (
    <div className="itemDetail">
      <img src={`../img/productos/${thumbnail}`} alt={title} className='imgItem'></img>
      <div className="sideItemDetail">
        <h6>Producto:</h6>
        <h1 className="nombreItemDetail">{title}</h1>
        <h5 className="catItemDetail">{category}</h5>
        <h5 className="precioItemDetail">Precio Unitario: ${price}</h5>
        <footer className="itemFooter">
          {!stock  ? (
            // <Link to='/cart' className='terminarCompra botonCompra'>Terminar Compra</Link>
                <h5 className="catItemDetail">Sin stock</h5>
            
          ) : (
            // <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
            <button className='botonCompra' onClick={() => handleOnAdd()} disabled={!stock}>
          Agregar al carrito
        </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ItemDetail;
