// utils/passwordHash.js
import { supabase } from '../supabaseClient';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = parseInt(import.meta.env.VITE_BCRYPT_SALT_ROUNDS) || 10;

export const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    console.error('Password hashing failed:', error);
    throw new Error('Password processing failed');
  }
};

export const verifyPassword = async (plainPassword, hash) => {
  try {
    return await bcrypt.compare(plainPassword, hash);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
};

// Utility to hash existing passwords (run once)
export const hashExistingPasswords = async () => {
  const { data: admins } = await supabase
    .from('admin')
    .select('id, password');
  
  for (const admin of admins) {
    if (admin.password && !admin.password.startsWith('$2a$')) {
      const hash = await hashPassword(admin.password);
      await supabase
        .from('admin')
        .update({ password_hash: hash })
        .eq('id', admin.id);
    }
  }
};