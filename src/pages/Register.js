import React, { useState } from "react";
import "./style.css"; // Asegúrate de enlazar el archivo CSS
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    cif: "",
    phoneNumber: "",
    description: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePicture, setProfilePicture] = useState(null); // Para manejar la foto
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Asignar la foto seleccionada
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const entry = new FormData(); // Usar FormData para enviar archivos
    entry.append("email", formData.email);
    entry.append("username", formData.username);
    entry.append("password", formData.password);
    entry.append("cif", formData.cif);
    entry.append("phoneNumber", formData.phoneNumber);
    entry.append("description", formData.description);
    if (profilePicture) {
      entry.append("profilePicture", profilePicture); // Adjuntar la foto si existe
    }

    if (!/^\d{8}$/.test(formData.cif)) {
      notify("El CIF debe de tener 8 dígitos.");
      return;
    }

    if (!/^\d{8}$/.test(formData.phoneNumber)) {
      notify("El número telefónico debe de tener 8 dígitos.");
      return;
    }

    // Validación de contraseñas
    const passwordErrors = validatePassword(
      formData.password,
      formData.confirmPassword
    );
    if (passwordErrors.length > 0) {
      passwordErrors.forEach((error) => notify(error)); // Mostrar cada error en una notificación
      return;
    }

    try {
      const response = await fetch('http://localhost:26417/api/auth/register', {
        method: 'POST',
        body: entry, // Enviar FormData
      });

      if (response.ok) {
        notify('Usuario registrado exitosamente 🎉');
        navigate('/'); // Redirige al menú principal
      } else {
        const errorData = await response.json();
        notify(`Error: ${errorData.message || 'An unknown error occurred'}`);
      }
    } catch (error) {
      notify('Error. Por favor intente nuevamente.');
      console.error('Error:', error);
    }
  };

  const validatePassword = (password, confirmPassword) => {
    const errors = [];

    if (password !== confirmPassword) {
      errors.push('Las contraseñas no concuerdan.');
    }

    if (password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caractéres.');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe tener al menos una mayúscula.');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('La contraseña debe tener al menos una minúscula.');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('La contraseña debe tener al menos un número.');
    }

    return errors;
  };

  return (
    <div className="login">
      <img
        src="../uam_background_img.jpg" //Background fondo de UAM de registro
        alt="login background"
        className="login__img"
      />
      <ToastContainer />

      <div className="register-container">
        {/* Cuadro izquierdo */}
        <form className="container left-box">
          <h2 className="login__title">Detalles del Usuario</h2>

          {/* Email */}
          <div className="login__box">
            <i className="ri-mail-line login__icon"></i>
            <div className="login__box-input">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="email" className="login__label">
                Email
              </label>
            </div>
          </div>

          {/* Username */}
          <div className="login__box">
            <i className="ri-user-line login__icon"></i>
            <div className="login__box-input">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="username" className="login__label">
                Nombre de Usuario
              </label>
            </div>
          </div>

          {/* CIF */}
          <div className="login__box">
            <i className="ri-file-copy-line login__icon"></i>
            <div className="login__box-input">
              <input
                type="text"
                name="cif"
                value={formData.cif}
                onChange={handleInputChange}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="cif" className="login__label">
                CIF
              </label>
            </div>
          </div>

          {/* Phone Number */}
          <div className="login__box">
            <i className="ri-phone-line login__icon"></i>
            <div className="login__box-input">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="phoneNumber" className="login__label">
                Número Telefónico
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="login__box">
            <i className="ri-file-text-line login__icon"></i>
            <div className="login__box-input">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="login__input"
                rows="3"
                placeholder=" "
              ></textarea>
              <label htmlFor="description" className="login__label">
                Descripción
              </label>
            </div>
          </div>
        </form>

        {/* Cuadro derecho */}
        <form onSubmit={handleSubmit} className="container right-box">
          <h2 className="login__title">Seguridad</h2>

          {/* Password */}
          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="password" className="login__label">
                Contraseña
              </label>
              <i
                className={`ri-eye${showPassword ? "-line" : "-off-line"} login__eye`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="login__box">
            <i className="ri-lock-line login__icon"></i>
            <div className="login__box-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="confirmPassword" className="login__label">
                Confirmar Contraseña
              </label>
              <i
                className={`ri-eye${showConfirmPassword ? "-line" : "-off-line"} login__eye`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="login__box">
            <i className="ri-image-line login__icon"></i>
            <div className="login__box-input">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="login__input"
              />
              <label className="login__label">Foto de Perfil</label>
            </div>
          </div>

          {/* Botón */}
          <button type="submit" className="login__button">
            Registrar
          </button>

          <p className="login__register">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/auth/login" className="login__link">
              Logeate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
