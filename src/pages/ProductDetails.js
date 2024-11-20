import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { productId } = useParams(); // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Llama al backend para obtener los detalles del producto
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:26417/api/products/${productId}` // Reemplaza con la URL del backend
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data); // Actualiza el estado con los detalles del producto
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>No se encontraron detalles para este producto.</p>;
  }

  return (
    <div className="p-6">
      <img
        className="w-full h-96 object-cover rounded-lg"
        src={product.imageUrl}
        alt={product.title}
      />
      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <span className="block text-2xl font-semibold mt-4">
        ${product.price.toFixed(2)}
      </span>
    </div>
  );
}
