import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify = (message) =>
    toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:26417/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        notify("Logged in successfully!");
        navigate("/tasks");
      } else {
        const errorData = await response.json();
        notify(`Error: ${errorData.message}`);
      }
    } catch (error) {
      notify("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <img
        src="../uam_background_img.jpg" //Background fondo de UAM de login
        alt="login background"
        className="login__img"
      />
      <ToastContainer />

      <div className="register-container">
        <form className="container right-box" onSubmit={handleSubmit}>
          <h2 className="login__title">Log in</h2>

          {/* Username */}
          <div className="login__box">
            <div className="login__box-input">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="username" className="login__label">
                Nombre de Usuario
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="login__box">
            <div className="login__box-input">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="email" className="login__label">
                Correo
              </label>
            </div>
          </div>

          {/* Password */}
          <div className="login__box">
            <div className="login__box-input">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login__input"
                placeholder=" "
              />
              <label htmlFor="password" className="login__label">
                Contraseña
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login__button">
            Loguearse
          </button>

          <p className="login__register">
            ¿No tienes una cuenta?{" "}
            <Link to="/auth/register" className="login__link">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
