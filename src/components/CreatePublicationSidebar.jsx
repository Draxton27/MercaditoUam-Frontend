import React, { useState } from "react";

export default function CreatePublicationSidebar({ onPublish }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        images: [],
    });

    const [previewImages, setPreviewImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Validar que solo se suban archivos PNG y máximo 5 imágenes
        const validFiles = files.filter(
            (file) => file.type === "image/png" && formData.images.length < 5
        );

        if (validFiles.length !== files.length) {
            alert("Solo se aceptan imágenes PNG y un máximo de 5 imágenes.");
        }

        const updatedImages = [...formData.images, ...validFiles.slice(0, 5 - formData.images.length)];
        setFormData({ ...formData, images: updatedImages });

        const previews = updatedImages.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = getCookie("access_token"); // Extraer el token desde las cookies
        if (!accessToken) {
            console.error("Access token no encontrado en las cookies.");
            alert("No se encontró un token de acceso. Por favor, inicie sesión.");
            return;
        }

        const requestData = {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            images: await Promise.all(
                formData.images.map((file) => fileToBase64(file))
            ),
        };

        try {
            const response = await fetch("http://localhost:8080/api/product/createproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`, // Pasa el token en el encabezado
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                alert("Publicación creada exitosamente.");
                window.location.href = "/marketplace"; // Redirige a la página del marketplace
            } else {
                const errorData = await response.json();
                console.error("Error de la API:", errorData);
                alert("Error al crear la publicación.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Ocurrió un error al intentar crear la publicación.");
        }
    };

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]); // Extraer solo el Base64
            reader.onerror = (error) => reject(error);
        });

    return (
        <div className="w-1/3 p-4 bg-blue-300 h-screen overflow-y-auto flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Artículo en venta</h2>
            <form onSubmit={handleSubmit}>
                {/* Subida de imágenes */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Fotos</label>
                    <input
                        type="file"
                        accept="image/png"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-black" // Agregada la clase text-black
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Puedes agregar un máximo de 5 fotos en formato PNG.
                    </p>
                    <div className="mt-2 flex space-x-2">
                        {previewImages.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Preview ${index}`}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                        ))}
                    </div>
                </div>

                {/* Título */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Título</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" // Agregada la clase text-black
                        required
                    />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Descripción</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" // Agregada la clase text-black
                        required
                    ></textarea>
                </div>

                {/* Precio */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" // Agregada la clase text-black
                        required
                    />
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Publicar
                </button>
            </form>
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