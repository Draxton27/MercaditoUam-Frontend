import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import LoadingSpinner from "./LoadingSpinner";

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const accessToken = getCookie("access_token"); // Extraer el token desde las cookies
            console.log (accessToken);
            if (!accessToken) {
                console.error("Access token no encontrado en las cookies.");
                toast.error("No se encontró el token de acceso. Inicia sesión nuevamente.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/profile/getUserProfile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json", // Asegura el tipo de contenido
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    toast.error("Error al cargar el perfil");
                }
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                toast.error("Error al cargar el perfil");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!profileData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-xl font-semibold">No se pudo cargar el perfil</h1>
                    <p className="text-gray-600 mt-2">Por favor, inténtalo más tarde.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <ProfileHeader profileData={profileData} />
                    <ProfileDetails profileData={profileData} />
                </div>
            </main>
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
