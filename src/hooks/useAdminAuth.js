// hooks/useAdminAuth.js
import { useState } from "react";
import { adminLogin, adminLogout as logoutService } from "../services/AdminAuthService";

export const useAdminAuth = (showPopup, resetForm, navigate) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const handleLogin = async (form) => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    
    try {
      const result = await adminLogin(form.username, form.password);

      if (!result.success) {
        showPopup(result.message);
        setIsLoggingIn(false); // Make sure to reset loading state
        return;
      }

      setAdminUser(result.user);
      
      // Reset form after successful login
      if (resetForm) {
        resetForm();
      }

      showPopup("Login Successful", true);

      setTimeout(() => {
        setIsLoggingIn(false);
        if (navigate) {
          navigate("/dashboard");
        }
      }, 1000);

      return result.user;
      
    } catch (error) {
      showPopup("An error occurred during login");
      console.error("Login error:", error);
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    // Clear session storage using the service
    logoutService();
    
    // Clear state
    setAdminUser(null);
    
    // Show popup
    showPopup("Logged out successfully", true);
    
    // Redirect to login
    setTimeout(() => {
      if (navigate) {
        navigate('/');
      }
    }, 1000);
  };

  return {
    isLoggingIn,
    adminUser,
    handleLogin,
    logout
  };
};