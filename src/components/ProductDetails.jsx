import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import data from "../data/data.json";

export default function ProductDetails() {
    const location = useLocation();
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
            <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-lg max-w-5xl w-full h-[36rem]">
                {/* Carrusel de imágenes */}
                <div className="relative flex justify-center items-center w-full md:w-1/2 bg-gray-200">
                    <img
                        className="object-cover rounded-lg max-h-full"
                        src={images[currentImageIndex]}
                        alt={`Imagen ${currentImageIndex + 1}`}
                    />
                    {/* Botón Anterior */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                    >
                        &#8249;
                    </button>
                    {/* Botón Siguiente */}
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                    >
                        &#8250;
                    </button>
                </div>

                {/* Detalles del producto */}
                <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.title}</h1>
                    <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                    <p className="text-xl font-bold text-gray-900 mb-4">
                        Precio: ${product.price.toFixed(2)}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                        <p><strong>Propietario:</strong> {product.ownerUsername}</p>
                        <p><strong>Email:</strong> {product.ownerEmail}</p>
                        <p><strong>Teléfono:</strong> {product.ownerPhoneNumber || "No disponible"}</p>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                        <p><strong>Creado el:</strong> {new Date(product.createdAt).toLocaleString()}</p>
                        <p><strong>Activo:</strong> {product.active ? "Sí" : "No"}</p>
                        <p><strong>Destacado:</strong> {product.featured ? "Sí" : "No"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
