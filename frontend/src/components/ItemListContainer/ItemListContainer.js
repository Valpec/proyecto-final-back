import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemList from "../ItemList /ItemList";
import productsService from "../../services/prods.service";
import Pagination from "../Pagination/Pagination";
import { AuthContext } from "../../context/AuthContext";

const ItemListContainer = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoriaId } = useParams();
    const [pagination, setPagination] = useState({});
    const navigate = useNavigate();

    const fetchProducts = async (categoryId, page) => {
        setLoading(true);
        try {
            const productos = await productsService.obtenerProductos(categoryId, page);
            setProducts(productos.docs);
            setPagination({
                hasNextPage: productos.hasNextPage,
                hasPrevPage: productos.hasPrevPage,
                nextPage: productos.nextPage,
                prevPage: productos.prevPage,
                totalPages: productos.totalPages,
                currentPage: productos.page,
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts(categoriaId, 1);
        } else {
            navigate('/login');  
        }
    }, [categoriaId, isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return <p>Debe estar logueado para ver este contenido</p>;
    }

    return (
        <>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <ItemList products={products} />
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages} 
                        onPageChange={page => fetchProducts(categoriaId, page)}
                    />
                </div>
            )}
        </>
    );
};

export default ItemListContainer;
