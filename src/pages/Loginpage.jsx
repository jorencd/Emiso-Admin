import React, { useState } from 'react'
import bg from '../assets/loginBG/loginBG.jpg'
import Logo from '../assets/logo/PLSPLogo.png'
import Popup from '../components/pop_up/Popup';

function LoginPage() {
  const idRegex = /^\d{6,12}$/;
  
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: false
  });

  const showPopup = (msg, success = false) => {
    setPopup({ show: true, message: msg, success });
    setTimeout(() => {
      setPopup({ show: false, message: "", success: false });
    }, 3000);
  };

  const [form, setForm] = useState({
    loginId: '',
    loginPass: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // LOGIN VALIDATION
  const validateLogin = () => {
    if (!idRegex.test(form.loginId)) {
      showPopup("Admin ID must be 6–12 digits");
      return false;
    }

    if (!form.loginPass) {
      showPopup("Password is required");
      return false;
    }

    showPopup("Login Successful ✅", true);
    return true;
  };

  return (
    <div
      className='h-screen bg-cover bg-center relative'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Popup
        show={popup.show}
        message={popup.message}
        success={popup.success}
        onClose={() => setPopup({ ...popup, show: false })}
      />

      <div className='absolute inset-0 bg-gradient-to-b from-green-100/60 to-emerald-800/100 backdrop-blur-xs'></div>

      <div className='flex md:flex-row flex-col md:mx-30 gap-y-4 gap-x-30 items-center justify-center relative z-10 h-full'>
        <div className='flex flex-col items-center gap-y-4'>
          <div
            className='md:h-70 md:w-70 h-40 w-40 bg-cover rounded-full'
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>
          <p className='md:text-2xl text-xl w-full font-bold text-white'>
            Pamantasan ng Lungsod ng San Pablo
          </p>
        </div>

        <div className='flex flex-col w-100 justify-center items-center gap-y-2 bg-white rounded-xl p-6'>
          <h1 className='text-green-900 font-bold text-3xl'>Welcome!</h1>
          <p>Fill out the information below in order to access your account</p>

          <input
            name="loginId"
            placeholder='Admin ID'
            className='border-2 border-gray-300 rounded p-2 w-full'
            value={form.loginId}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="loginPass"
            placeholder='Password'
            className='border-2 border-gray-300 rounded p-2 w-full'
            value={form.loginPass}
            onChange={handleInputChange}
          />

          <button
            onClick={validateLogin}
            className='bg-green-700 w-full text-white px-4 py-2 rounded hover:bg-green-800 transition'
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;