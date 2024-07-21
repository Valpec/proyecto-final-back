import { useEffect, useState} from "react"
// import {getProductById} from "../../itemsProductos"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import productsService from "../../services/prods.service";

// import { collection, getDoc, doc} from 'firebase/firestore'
// import { db } from '../../services/firebaseConfig'

const ItemDetailContainer = () => {
    const [product, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const {itemId} = useParams()

    useEffect(()=>{
        const fetchProduct = async() =>{
            setLoading(true)
            try {
                const productos = await productsService.obtenerProductoId(itemId);
                const productAdapted = { id: productos.id, ...productos}
                setProducts(productAdapted)
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }


            
          
        }
        fetchProduct()
    },[itemId])


    return(
        <div className="ItemDetailContainer">
           {loading ? <p>cargando...</p> : <ItemDetail {...product} />}
        </div>
    )
}

export default ItemDetailContainer;