import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";

export default function MarketPlace() {
    const [products, setProducts] = useState([]); // Todos los productos cargados
    const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda ingresado por el usuario
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados que se muestran

    useEffect(() => {
        const fetchProducts = async () => {
            const accessToken = getCookie("access_token");

            if (!accessToken) {
                console.error("Access token no encontrado en las cookies.");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/product/getProducts", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // Procesar los productos para agregar un placeholder como imagen
                    const processedData = data.map(product => ({
                        ...product,
                        imageUrl: "https://via.placeholder.com/300x200.png?text=Imagen+No+Disponible",
                    }));

                    setProducts(processedData); // Asigna los productos al estado
                    setFilteredProducts(processedData); // Inicialmente, muestra todos los productos
                } else {
                    const errorData = await response.json();
                    console.error("Error al obtener los productos:", errorData);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchProducts();
    }, []);

    // Función para manejar la búsqueda al presionar Enter
    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    };

    // Función para realizar la búsqueda localmente
    const performSearch = () => {
        if (searchTerm.trim() === "") {
            // Si el término de búsqueda está vacío, mostrar todos los productos
            setFilteredProducts(products);
        } else {
            const results = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container mx-auto px-4">
                {/* Barra de búsqueda */}
                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white"
                        style={{ backgroundColor: "white", color: "black" }}
                    />
                </div>
                {/* Mostrar las cards */}
                {filteredProducts.length > 0 ? (
                    <Cards products={filteredProducts} />
                ) : (
                    <p className="text-center text-gray-500">No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}
