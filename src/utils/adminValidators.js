// utils/adminValidators.js
export const validateAdminLogin = (form) => {
  if (!form.username || form.username.trim() === "") {
    return "Username is required";
  }
  
  if (!form.password || form.password.trim() === "") {
    return "Password is required";
  }
  
  // Based on your sample data, passwords seem to have @ symbol
  // You can add specific validation if needed
  if (form.password.length < 6) {
    return "Password must be at least 6 characters";
  }
  
  return null;
};