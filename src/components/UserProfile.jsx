import React from 'react';

const profileData = {
  email: "usuario@ejemplo.com",
  username: "UsuarioEjemplo",
  cif: "B12345678",
  phoneNumber: "+34 123 456 789",
  description: "Soy un usuario de ejemplo con una pasión por la tecnología y la innovación.",
};

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={`https://ui-avatars.com/api/?name=${profileData.username}&size=192&background=random`}
              alt={`Avatar de ${profileData.username}`}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Mi Perfil</div>
            <h2 className="mt-2 text-2xl leading-8 font-semibold text-gray-900">{profileData.username}</h2>
            <p className="mt-2 text-gray-600">{profileData.description}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.email}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">CIF</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.cif}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Número Telefónico</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.phoneNumber}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

