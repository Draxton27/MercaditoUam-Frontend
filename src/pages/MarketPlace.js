import { useEffect, useState } from "react";
import Cards from "../components/Cards"
import NavBar from "../components/NavBar"

export default function MarketPlace() {
    //const [products, setProducts] = useState([]);

    /*useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:26417/api/products");
            if (response.ok) {
            const data = await response.json();
            setProducts(data); // Asigna los productos al estado
            } else {
            console.error("Error fetching products");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        };

        fetchProducts();
    }, []);*/

    const products = [
        {
          productId: 1,
          title: "Silla Gamer",
          description:
            "Una silla ergonómica ideal para largas sesiones de juego. Con diseño ajustable y material premium.",
          price: 249.99,
          images: "https://via.placeholder.com/300x200.png?text=Silla+Gamer",
        },
        {
          productId: 2,
          title: "Laptop de Alta Gama",
          description:
            "Laptop ultradelgada con procesador Intel i7, 16GB RAM y almacenamiento SSD de 512GB.",
          price: 1299.99,
          images: "https://via.placeholder.com/300x200.png?text=Laptop",
        },
        {
          productId: 3,
          title: "Auriculares Inalámbricos",
          description:
            "Auriculares Bluetooth con cancelación de ruido y batería de larga duración.",
          price: 149.99,
          images: "https://via.placeholder.com/300x200.png?text=Auriculares",
        },
        {
          productId: 4,
          title: "Monitor 4K",
          description:
            "Monitor 4K UHD de 27 pulgadas, ideal para edición de video y juegos de alta calidad.",
          price: 399.99,
          images: "https://via.placeholder.com/300x200.png?text=Monitor+4K",
        },
      ];

    return(
        <div>
            <NavBar/>
            <Cards products={products}/>
        </div>
    )
}