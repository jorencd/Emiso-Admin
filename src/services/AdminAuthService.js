// services/AdminAuthService.js
import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";

// LOGIN - Compare hashed password
export const adminLogin = async (username, password) => {
  try {
    // Input sanitization
    const sanitizedUsername = username?.trim() || '';
    const sanitizedPassword = password?.trim() || '';
    
    console.log('Looking for username:', sanitizedUsername);

    if (!sanitizedUsername || !sanitizedPassword) {
      return {
        success: false,
        message: 'Username and password are required'
      };
    }

    // First, try to find by username only (simpler query)
    let { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", sanitizedUsername)
      .maybeSingle();

    // If not found by username and the input looks like a UUID, try by ID
    if (!data && !error) {
      // Check if the input is a valid UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(sanitizedUsername)) {
        console.log('Trying to find by ID as UUID');
        const { data: idData, error: idError } = await supabase
          .from("admin")
          .select("*")
          .eq("id", sanitizedUsername)
          .maybeSingle();
        
        data = idData;
        error = idError;
      }
    }

    if (error) {
      console.log('Query error:', error);
    }

    console.log('Found data:', data);

    if (!data) {
      return { 
        success: false, 
        message: "Invalid login credentials" 
      };
    }

    // Check what field actually contains the password
    const storedPassword = data.password_hash || data.password || '';
    
    // Try direct comparison first (for plain text)
    let isPasswordValid = false;
    
    if (storedPassword === sanitizedPassword) {
      isPasswordValid = true;
    } else {
      // If not plain text match, try bcrypt compare (for hashed passwords)
      try {
        isPasswordValid = await bcrypt.compare(sanitizedPassword, storedPassword);
      } catch  {
        console.log('bcrypt compare failed');
      }
    }
    
    if (!isPasswordValid) {
      return { 
        success: false, 
        message: "Invalid login credentials" 
      };
    }

    // Update last_login timestamp
    await supabase
      .from("admin")
      .update({ last_login: new Date().toISOString() })
      .eq("id", data.id);

    // Create user object without sensitive data
    const userWithoutPassword = {
      id: data.id,
      username: data.username || sanitizedUsername,
      email: data.email,
      role: data.role || 'admin',
      last_login: data.last_login
    };
    
    // Store in session
    sessionStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));
    sessionStorage.setItem('adminLoginTime', Date.now().toString());
    
    return { 
      success: true, 
      user: userWithoutPassword 
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login'
    };
  }
};

// Rest of the functions remain the same...
export const isAdminAuthenticated = () => {
  try {
    const user = sessionStorage.getItem('adminUser');
    const loginTime = sessionStorage.getItem('adminLoginTime');
    
    if (!user || !loginTime) return false;
    
    const sessionDuration = 8 * 60 * 60 * 1000;
    const timeElapsed = Date.now() - parseInt(loginTime);
    
    if (timeElapsed > sessionDuration) {
      adminLogout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const getCurrentAdmin = () => {
  try {
    const userStr = sessionStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current admin:', error);
    return null;
  }
};

export const adminLogout = () => {
  try {
    sessionStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminLoginTime');
    localStorage.removeItem('adminPreferences');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getAdminById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      last_login: data.last_login
    };
    
  } catch (error) {
    console.error('Error fetching admin:', error);
    return null;
  }
};

export const updateAdminPassword = async (adminId, newPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const { error } = await supabase
      .from("admin")
      .update({ password_hash: hashedPassword })
      .eq("id", adminId);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Password updated successfully" };
    
  } catch (error) {
    console.error('Error updating password:', error);
    return { success: false, message: "Error updating password" };
  }
};

export const refreshAdminSession = () => {
  try {
    if (isAdminAuthenticated()) {
      sessionStorage.setItem('adminLoginTime', Date.now().toString());
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return false;
  }
};