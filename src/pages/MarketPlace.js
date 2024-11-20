import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";

export default function MarketPlace() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const accessToken = getCookie("access_token"); // Extraer el token desde las cookies

            if (!accessToken) {
                console.error("Access token no encontrado en las cookies.");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/product/getProducts", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`, // Pasa el token en el encabezado
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // Procesar los productos para agregar el esquema MIME al imageData
                    const processedData = data.map(product => {
                        // Intenta asumir PNG por defecto. Puedes agregar lógica si el formato es determinable dinámicamente.
                        const mimeType = "image/png"; // Cambia a "image/jpeg" si sabes que son JPG.
                        const base64Image = product.imageData
                            ? `data:${mimeType};base64,${product.imageData}`
                            : "https://via.placeholder.com/300x200.png?text=Sin+Imagen"; // Manejar casos donde no haya imagen

                        console.log("Base64 generado:", product.imageData); // Verifica si la cadena Base64 tiene contenido válido.
                        console.log("URL generada:", base64Image);

                        return {
                            ...product,
                            imageUrl: base64Image,
                        };
                    });

                    setProducts(processedData); // Asigna los productos procesados al estado
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

    return (
        <div>
            <NavBar />
            <Cards products={products} />
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
