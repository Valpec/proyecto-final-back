import { useEffect, useState } from "react";
import ItemList from "../ItemList /ItemList";
import { useParams } from "react-router-dom";
import productsService from "../../services/prods.service";
import Pagination from "../Pagination/Pagination";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoriaId } = useParams();
    const [pagination, setPagination] = useState({});

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
            })
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(categoriaId, 1);
    }, [categoriaId]);

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
