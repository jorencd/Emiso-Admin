// hooks/useAdminLoginForm.js
import { useState } from "react";
import { validateAdminLogin } from "../utils/adminValidators";

export const useAdminLoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateLogin = () => validateAdminLogin(form);

  const resetForm = () => {
    setForm({
      username: "",
      password: "",
    });
  };

  return {
    form,
    handleChange,
    validateLogin,
    resetForm,
  };
};