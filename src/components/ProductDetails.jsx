import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import data from "../data/data.json";

export default function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { productId } = location.state || {};
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de imagen actual
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]); // Imágenes del producto

    useEffect(() => {
        if (!productId) {
            console.error("No se proporcionó un productId.");
            setIsLoading(false);
            return;
        }

        // Asignar imágenes desde el archivo JSON
        if (data[productId]) {
            setImages(data[productId]);
        } else {
            console.warn("No se encontraron imágenes para este producto.");
            setImages(["/assets/images/placeholder.jpg"]); // Imagen por defecto
        }

        const fetchProductDetails = async () => {
            const token = Cookies.get("access_token");

            if (!token) {
                console.error("No se encontró el token de acceso");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/product/getProductWithOwner", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId: productId }),
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los detalles del producto");
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error al obtener los detalles del producto:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    const handleBuy = async () => {
        const token = Cookies.get("access_token");

        if (!token) {
            console.error("No se encontró el token de acceso");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/product/deactivateProduct", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: productId }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Error al comprar el producto:", errorData);
                alert(`Error al comprar el producto: ${errorData}`);
                return;
            }

            const successMessage = await response.text();
            console.log(successMessage);
            alert("¡Producto comprado exitosamente!");

            navigate("/marketplace");

            // Actualizar el estado del producto para reflejar que está inactivo
            setProduct((prevProduct) => ({
                ...prevProduct,
                active: false,
            }));

        } catch (error) {
            console.error("Error al comprar el producto:", error);
            alert("Ocurrió un error al comprar el producto.");
        }
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (isLoading) {
        return <p className="text-center text-lg font-semibold">Cargando detalles del producto...</p>;
    }

    if (!product) {
        return <p className="text-center text-lg font-semibold">No se encontró el producto.</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div
                className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-lg max-w-5xl w-full h-[36rem]">
                {/* Carrusel de imágenes */}
                <div className="relative flex justify-center items-center w-full md:w-1/2 bg-gray-200">
                    {/* Fondo difuminado */}
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-md z-0"
                        style={{
                            backgroundImage: `url(${images[currentImageIndex]})`,
                        }}
                    ></div>

                    {/* Imagen principal */}
                    <img
                        className="relative object-contain max-h-full z-10"
                        src={images[currentImageIndex]}
                        alt={`Imagen ${currentImageIndex + 1}`}
                    />

                    {/* Botón Anterior */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-20"
                    >
                        &#8249;
                    </button>

                    {/* Botón Siguiente */}
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-20"
                    >
                        &#8250;
                    </button>
                </div>

                {/* Detalles del producto */}
                <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                    <h1 className="text-4xl font-bold mb-6 text-gray-900">{product.title}</h1>
                    <p className="text-lg text-gray-700 mb-6">{product.description}</p>
                    <p className="text-2xl font-bold text-green-600 mb-6">
                        Precio: ${product.price.toFixed(2)}
                    </p>
                    <div className="text-base text-gray-600 space-y-2 mb-6">
                        <p><strong>Propietario:</strong> {product.ownerUsername}</p>
                        <p><strong>Email:</strong> {product.ownerEmail}</p>
                        <p><strong>Teléfono:</strong> {product.ownerPhoneNumber || "No disponible"}</p>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1 mb-6">
                        <p><strong>Creado el:</strong> {new Date(product.createdAt).toLocaleString()}</p>
                        <p><strong>Activo:</strong> {product.active ? "Sí" : "No"}</p>
                        <p><strong>Destacado:</strong> {product.featured ? "Sí" : "No"}</p>
                    </div>
                    <div className="flex justify-between mt-6">
                        {/* Botón para regresar */}
                        <button
                            onClick={handleBack} // Define esta función en tu componente
                            className="px-6 py-3 text-white bg-gray-700 rounded-lg hover:bg-gray-900"
                        >
                            Regresar
                        </button>
                        {/* Botón para comprar */}
                        <button
                            onClick={handleBuy} // Define esta función en tu componente
                            className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-800"
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
