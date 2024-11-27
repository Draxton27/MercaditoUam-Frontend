import React from "react";

export default function ProfileHeader({ profileData }) {
  const { username, description } = profileData;

  return (
    <div className="px-4 py-5 sm:px-6 bg-gray-50">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-20 w-20">
          <img
            className="h-20 w-20 rounded-full"
            src={`https://ui-avatars.com/api/?name=${username}&background=random`}
            alt={`Avatar de ${username}`}
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold leading-6 text-gray-900">
            {username}
          </h1>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">{description}</p>
    </div>
  );
}
