import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import LoadingSpinner from "./LoadingSpinner";

export default function Profile() {
  // const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /*useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/profile");
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
  }, []);*/
  const profileData = {
    email: "usuario@ejemplo.com",
    username: "Manuel Lopez",
    cif: "21011037",
    phoneNumber: "7826 6737",
    description: "Soy un usuario confiable que le gusta vender todo tipo de productos.",
  };

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

