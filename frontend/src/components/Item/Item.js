import './Item.css';
import { Link } from 'react-router-dom';
const Item = ({ id, category, title, price, thumbnail, stock }) => {
        
    return (
        <div className='itemCatalogo'>
             <img src={`../img/productos/${thumbnail}`} alt={title} className='imgItem'></img> 

            <div className="zonaTexto">
              <h5 className="nombreItem ">{title}</h5>
                <h6 className="catItem">{category}</h6>
            </div>
            <div className='footerItem'>
                <h5 className="precioItem">${price} </h5>
                <Link to={`/item/${id}`}><button className='botonCompra'> Ver más</button></Link>
           </div>
        </div>

    )
}

export default Item