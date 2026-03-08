// pages/AdminLoginPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/loginBG/loginBG.jpg";
import Logo from "../assets/logo/PLSPLogo.png";
import Popup from "../components/pop_up/Popup";
import FloatingInput from "../components/common/input/FloaterInput";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Icon } from "@iconify/react";

import { useAdminLoginForm } from "../hooks/useAdminLoginForm";
import { usePopup } from "../hooks/usePopup";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { isAdminAuthenticated } from "../services/AdminAuthService";

function AdminLoginPage() {
  const navigate = useNavigate();
  const { form, handleChange, validateLogin, resetForm } = useAdminLoginForm();
  const { popup, showPopup, hidePopup } = usePopup();
  const {
    isLoggingIn,
    handleLogin,
  } = useAdminAuth(showPopup, resetForm, navigate); // Now matches the hook parameters

  // Check if already logged in
  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Wrapper function to pass form data
  const onLogin = () => {
    console.log('Login attempt with:', form);
    const errorMsg = validateLogin();
    if (errorMsg) {
      showPopup(errorMsg);
      return;
    }
    handleLogin(form);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoggingIn) {
      onLogin();
    }
  };

  return (
    <div
      className="relative h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Popup
        show={popup.show}
        message={popup.message}
        success={popup.success}
        onClose={hidePopup}
      />

      <div className="absolute inset-0 bg-linear-to-b from-green-100/60 to-emerald-800 backdrop-blur-xs"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full md:flex-row md:mx-30 gap-y-4 gap-x-30">
        <div className="flex flex-col items-center gap-y-4">
          <div
            className="w-40 h-40 bg-cover rounded-full md:h-70 md:w-70"
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>

          <p className="text-xl font-bold text-center text-white md:text-2xl">
            Pamantasan ng Lungsod ng San Pablo
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg w-100 gap-y-4 rounded-xl">
          <AdminLoginForm
            form={form}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
            onLogin={onLogin}
            isLoggingIn={isLoggingIn}
          />
        </div>
      </div>
    </div>
  );
}

// Admin Login Form Component
const AdminLoginForm = ({ form, handleChange, handleKeyPress, onLogin, isLoggingIn }) => (
  <>
    <div className="flex items-center justify-center w-full gap-2 mb-2">
      <Icon icon="mdi:shield-account" className="text-4xl text-green-700" />
      <h1 className="text-3xl font-bold text-green-900">Admin Login</h1>
    </div>
    
    <p className="text-sm text-center text-gray-600">
      Enter your credentials to access the admin panel
    </p>

    <FloatingInput
      name="username"
      value={form.username}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      label="Username"
      icon="mdi:account-tie"
      disabled={isLoggingIn}
    />

    <FloatingInput
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      label="Password"
      icon="mdi:lock"
      disabled={isLoggingIn}
    />

    <button
      onClick={onLogin}
      disabled={isLoggingIn}
      className={`w-full px-4 py-3 text-white transition rounded cursor-pointer flex items-center justify-center mt-2
        ${isLoggingIn 
          ? 'bg-green-400 cursor-not-allowed' 
          : 'bg-green-700 hover:bg-green-800'
        }`}
    >
      {isLoggingIn ? (
        <>
          <LoadingSpinner />
          Logging in...
        </>
      ) : (
        'Login to Admin Panel'
      )}
    </button>

    <div className="flex justify-center w-full mt-2 text-sm">
      <div className="flex items-center gap-1 text-gray-500">
        <Icon icon="mdi:shield-lock-outline" />
        <p>Authorized personnel only</p>
      </div>
    </div>
  </>
);

export default AdminLoginPage;