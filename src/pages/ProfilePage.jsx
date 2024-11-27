import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileCard from "../components/Profile";

export default function ProfilePage() {
  return (
    <>
      <ToastContainer />
      <ProfileCard />
    </>
  );
}
