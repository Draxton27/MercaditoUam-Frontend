import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';

const sampleProfileData = {
  name: "María García",
  role: "Diseñadora UX/UI",
  description: "Apasionada por crear experiencias de usuario intuitivas y atractivas.",
  avatar: "/placeholder.svg?height=128&width=128",
  email: "maria.garcia@ejemplo.com",
  location: "Madrid, España",
  website: "www.mariagarcia.com"
};

export default function SampleProfile() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
        <ProfileHeader 
          name={sampleProfileData.name}
          role={sampleProfileData.role}
          description={sampleProfileData.description}
          avatar={sampleProfileData.avatar}
        />
        <ProfileDetails 
          email={sampleProfileData.email}
          location={sampleProfileData.location}
          website={sampleProfileData.website}
        />
      </div>
    </div>
  );
}

