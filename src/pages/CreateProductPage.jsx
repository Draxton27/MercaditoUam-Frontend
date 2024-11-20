import React from "react";
import NavBar from "../components/NavBar";
import CreatePublicationSidebar from "../components/CreatePublicationSidebar";

export default function CreateProductPage() {
    return (
        <div className="flex flex-col h-screen">
            <NavBar className="bg-blue-500 shadow-md py-4 px-6" />
            <main className="flex-1 flex">
                <CreatePublicationSidebar />
                <div className="flex-1 bg-gray-100 p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Crear una Publicación</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Usa el formulario a la izquierda para añadir tu publicación.
                    </p>
                </div>
            </main>
        </div>
    );
}
